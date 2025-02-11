import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      return NextResponse.json({ error: 'Компания не найдена' }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error('Ошибка при получении компании:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
