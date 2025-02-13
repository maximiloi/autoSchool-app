import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get('active');
    const companyId = searchParams.get('companyId');

    if (isActive === null || companyId === null) {
      return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
    }

    const activeStatus = isActive === 'true';

    const groups = await prisma.group.findMany({
      where: {
        isActive: activeStatus,
        companyId: companyId,
      },
      include: {
        company: true, // Подтягиваем данные компании
        theoryTeachers: true,
        practiceTeachers: true,
      },
    });

    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    const newGroup = await prisma.group.create({
      data: {
        groupNumber: data.groupNumber,
        category: data.category,
        startTrainingDate: new Date(data.startTrainingDate),
        endTrainingDate: new Date(data.endTrainingDate),
        companyId: data.companyId,
        theoryTeachers: {
          connect: data.theoryTeachers.map((teacher) => ({ id: teacher.id })),
        },
        practiceTeachers: {
          connect: data.practiceTeachers.map((teacher) => ({ id: teacher.id })),
        },
      },
      include: {
        theoryTeachers: true,
        practiceTeachers: true,
      },
    });

    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
