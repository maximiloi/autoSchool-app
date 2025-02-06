import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrganizationForm from './components/organization';
import TeachersTable from './components/teachers-table';
import TeachersForm from './components/teachers';

export default function OrganizationInfo() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Реквизиты организации</CardTitle>
        </CardHeader>
        <CardContent>
          <OrganizationForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Преподаватели организации</CardTitle>
        </CardHeader>
        <CardContent>
          <TeachersTable />
          <TeachersForm />
        </CardContent>
      </Card>
    </div>
  );
}
