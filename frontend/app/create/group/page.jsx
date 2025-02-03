import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FormCreationTrainingGroup from '@/components/forms/creation-training-group';

export default function CreationTrainingGroup() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Создание новой учебной группы</CardTitle>
        <CardDescription>Внимательно заполните все поля</CardDescription>
      </CardHeader>
      <CardContent>
        <FormCreationTrainingGroup />
      </CardContent>
    </Card>
  );
}
