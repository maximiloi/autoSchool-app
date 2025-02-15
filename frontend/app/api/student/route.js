import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const data = await req.json();

    const newStudent = await prisma.student.create({
      data: {
        lastName: data.lastName,
        firstName: data.firstName,
        phone: data.phone,
        gender: data.gender,
        registrationAddress: data.registrationAddress,
        actualAddress: data.actualAddress,
        documentType: data.documentType,
        region: data.region,
        groupId: data.group,
        companyId: data.companyId,
        trainingCost: new Prisma.Decimal(data.trainingCost),
        birthDate: new Date(data.birthDate),
        documentIssueDate: data.documentIssueDate ? new Date(data.documentIssueDate) : null,
        medicalIssueDate: data.medicalIssueDate ? new Date(data.medicalIssueDate) : null,
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
