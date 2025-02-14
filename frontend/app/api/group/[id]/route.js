import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID компании не указан' }, { status: 400 });
    }

    const groups = await prisma.group.findMany({
      where: {
        companyId: id,
      },
      include: {
        // company: true,
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
