'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';

const MIN_AGE = 16;
const currentDate = new Date();
const minBirthDate = new Date(
  currentDate.getFullYear() - MIN_AGE,
  currentDate.getMonth(),
  currentDate.getDate(),
);

const formSchema = z.object({
  lastName: z.string().min(2, 'Введите фамилию'),
  firstName: z.string().min(2, 'Введите имя'),
  middleName: z.string().optional(),
  gender: z.enum(['male', 'female'], { required_error: 'Выберите пол' }),
  birthDate: z
    .string()
    .regex(/^(\d{2})\.(\d{2})\.(\d{4})$/, 'Введите корректную дату в формате ДД.ММ.ГГГГ')
    .refine((dateString) => {
      const [day, month, year] = dateString.split('.').map(Number);
      const birthDate = new Date(year, month - 1, day);
      return birthDate <= minBirthDate;
    }, `Возраст должен быть не менее ${MIN_AGE} лет`),
  snils: z.string().length(11, 'Введите корректный СНИЛС'),
  birthPlace: z.string().min(2, 'Введите место рождения'),
  registrationAddress: z.string().min(2, 'Введите адрес прописки'),
  actualAddress: z.string().optional(),
  documentType: z.enum(['passport', 'license'], { required_error: 'Выберите документ' }),
  documentIssuer: z.string().min(2, 'Введите кем выдан'),
  documentCode: z.string().optional(),
  documentSeries: z.string().optional(),
  documentNumber: z.string().optional(),
  documentIssueDate: z
    .string()
    .regex(/^(\d{2})\.(\d{2})\.(\d{4})$/, 'Введите корректную дату в формате ДД.ММ.ГГГГ'),
  medicalSeries: z.string().optional(),
  medicalNumber: z.string().optional(),
  medicalIssueDate: z
    .string()
    .regex(/^(\d{2})\.(\d{2})\.(\d{4})$/, 'Введите корректную дату в формате ДД.ММ.ГГГГ'),
  medicalIssuer: z.string().optional(),
  license: z.string().optional(),
  licenseSeries: z.string().optional(),
  licenseNumber: z.string().optional(),
  region: z.string().optional(),
  medicalRestriction: z.string().optional(),
  allowedCategories: z.string().optional(),
  trainingCost: z.string().optional(),
  phone: z.string().min(10, 'Введите телефон'),
});

export default function DrivingSchoolForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      middleName: '',
      gender: 'male',
      birthDate: '',
      snils: '',
      birthPlace: '',
      registrationAddress: '',
      actualAddress: '',
      documentType: 'passport',
      documentIssuer: '',
      documentCode: '',
      documentSeries: '',
      documentNumber: '',
      documentIssueDate: '',
      medicalSeries: '',
      medicalNumber: '',
      medicalIssueDate: '',
      medicalIssuer: '',
      license: '',
      licenseSeries: '',
      licenseNumber: '',
      region: '',
      medicalRestriction: '',
      allowedCategories: '',
      trainingCost: '',
      phone: '',
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full space-y-4">
        <h2 className="text-lg font-semibold">📋 Форма ученика автошколы</h2>
        <div className="grid grid-cols-4 gap-4">
          <InputField name="lastName" label="Фамилия" control={form.control} />
          <InputField name="firstName" label="Имя" control={form.control} />
          <InputField name="middleName" label="Отчество" control={form.control} />
          <DropdownField
            name="gender"
            label="Пол"
            control={form.control}
            options={{ male: 'Мужской', female: 'Женский' }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField name="birthDate" label="Дата рождения (ДД.ММ.ГГГГ)" control={form.control} />
          <InputField name="snils" label="СНИЛС" control={form.control} />
        </div>

        <InputField name="birthPlace" label="Место рождения" control={form.control} />
        <InputField name="registrationAddress" label="Адрес регистрации" control={form.control} />
        <InputField name="actualAddress" label="Фактический адрес" control={form.control} />

        <h3 className="text-md font-semibold">Документ удостоверяющий личность</h3>
        <div className="grid grid-cols-3 gap-4">
          <DropdownField
            name="documentType"
            label="Тип документа"
            control={form.control}
            options={{ passport: 'Паспорт', license: 'Водительское удостоверение' }}
          />
          <InputField name="documentSeries" label="Серия" control={form.control} />
          <InputField name="documentNumber" label="Номер" control={form.control} />
        </div>
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
          <InputField name="documentIssuer" label="Кем выдан" control={form.control} />
          <InputField name="documentCode" label="Код" control={form.control} />
          <InputField
            name="documentIssueDate"
            label="Дата выдачи (ДД.ММ.ГГГГ)"
            control={form.control}
          />
        </div>

        <h3 className="text-md font-semibold">Медицинская справка</h3>
        <div className="grid grid-cols-3 gap-4">
          <InputField name="medicalSeries" label="Серия" control={form.control} />
          <InputField name="medicalNumber" label="Номер" control={form.control} />
          <InputField
            name="medicalIssueDate"
            label="Дата выдачи (ДД.ММ.ГГГГ)"
            control={form.control}
          />
        </div>
        <InputField name="medicalIssuer" label="Кем выдана" control={form.control} />

        <h3 className="text-md font-semibold">Лицензия</h3>
        <div className="grid grid-cols-3 gap-4">
          <InputField name="medicalSeries" label="Серия" control={form.control} />
          <InputField name="license" label="Номер" control={form.control} />
          <InputField name="region" label="Регион" control={form.control} />
        </div>

        <h3 className="text-md font-semibold">Дополнительная информация</h3>
        <div className="grid grid-cols-2 gap-4">
          <InputField name="medicalRestriction" label="Мед. ограничение" control={form.control} />
          <InputField
            name="allowedCategories"
            label="Разрешенные категории ТС"
            control={form.control}
          />
          <InputField name="trainingCost" label="Стоимость обучения" control={form.control} />
          <InputField name="phone" label="Телефон" control={form.control} />
        </div>

        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  );
}

function InputField({ name, label, control }) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={label} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function DropdownField({ name, control, options }) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.entries(options).map(([value, text]) => (
                <SelectItem key={value} value={value}>
                  {text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
