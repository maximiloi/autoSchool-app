'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { teachers } from '@/mock/teachers';

export default function TeachersTable() {
  const [sortedTeachers, setSortedTeachers] = useState(teachers);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = () => {
    const sorted = [...sortedTeachers].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.activityType.localeCompare(b.activityType);
      } else {
        return b.activityType.localeCompare(a.activityType);
      }
    });
    setSortedTeachers(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold">📋 Список преподавателей и мастеров</h2>
      <Button onClick={handleSort} className="mb-4">
        Сортировать по виду деятельности ({sortOrder === 'asc' ? '▲' : '▼'})
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Фамилия</TableHead>
            <TableHead>Инициалы</TableHead>
            <TableHead>Вид деятельности</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTeachers.map((teacher, index) => (
            <TableRow key={index}>
              <TableCell>{teacher.lastName}</TableCell>
              <TableCell>
                {teacher.firstName[0]}. {teacher.middleName[0]}.
              </TableCell>
              <TableCell>
                {teacher.activityType === 'theory'
                  ? 'Преподаватель теории'
                  : 'Преподаватель практики'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
