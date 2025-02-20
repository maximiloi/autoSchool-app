import Link from 'next/link';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CarFront, FileUser, NotepadText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function TablePage({ group }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]"></TableHead>
          <TableHead className="w-[20px]">#</TableHead>
          <TableHead className="w-[200px]">ФИО</TableHead>
          <TableHead className="w-[145px]">Дата рождения</TableHead>
          <TableHead className="w-[80px]">Договор</TableHead>
          <TableHead>Вождение</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {group.students.map((student, index) => (
          <TableRow key={student.id}>
            <TableCell>
              <Button variant="ghost" size="icon">
                <Link href={`/app/student/${student.id}`}>
                  <FileUser />
                </Link>
              </Button>
            </TableCell>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">
              {student.lastName} {student.firstName}{' '}
              {student.middleName ? `${student.middleName.charAt(0)}.` : ''}
            </TableCell>
            <TableCell>{format(student.birthDate, 'dd/MM/yyyy', { locale: ru })}</TableCell>
            <TableCell>
              <Button variant="outline" size="icon">
                <NotepadText />
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="icon">
                <CarFront />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
