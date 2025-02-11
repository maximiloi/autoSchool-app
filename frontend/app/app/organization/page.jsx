import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrganizationForm from './components/organization';
import TeachersTable from './components/teachers-table';
import TeachersForm from './components/teachers';

export default function OrganizationInfo() {
  return (
    <Tabs defaultValue="organization" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="organization">Реквизиты</TabsTrigger>
        <TabsTrigger value="teachers">Преподаватели</TabsTrigger>
      </TabsList>
      <TabsContent value="organization">
        <Card>
          <CardHeader>
            <CardTitle>Реквизиты организации</CardTitle>
          </CardHeader>
          <CardContent>
            <OrganizationForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="teachers">
        <Card>
          <CardHeader>
            <CardTitle>Преподаватели организации</CardTitle>
          </CardHeader>
          <CardContent>
            <TeachersTable />
            <TeachersForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
