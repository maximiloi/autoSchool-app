import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CompanyForm from './components/company';
import TeachersTable from './components/teachers-table';
import TeachersForm from './components/teachers';

export default function companyInfo() {
  return (
    <Tabs defaultValue="company" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="company">Реквизиты</TabsTrigger>
        <TabsTrigger value="teachers">Преподаватели</TabsTrigger>
        <TabsTrigger value="auto">Автомобили</TabsTrigger>
      </TabsList>
      <TabsContent value="company">
        <Card>
          <CardHeader>
            <CardTitle>Реквизиты организации</CardTitle>
          </CardHeader>
          <CardContent>
            <CompanyForm />
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
      <TabsContent value="auto">
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
