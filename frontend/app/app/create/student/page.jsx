'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import InputField from '@/components/ui/InputField';
import DropdownField from '@/components/ui/DropdownField';
import { formSchema } from './formSchema';
import dateParse from '@/lib/dateParse';

export default function StudentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeGroups, setActiveGroups] = useState(null);
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const { reset, ...form } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: 'male',
      documentType: 'passport',
    },
  });

  useEffect(() => {
    if (status === 'authenticated') {
      async function fetchActiveGroups() {
        try {
          const response = await fetch(`/api/group/`);
          if (!response.ok) throw new Error('Ошибка загрузки активных групп');
          const data = await response.json();
          const groups = data.filter((group) => group.isActive);

          setActiveGroups(groups);
        } catch (error) {
          console.error('Ошибка загрузки активных групп:', error);
          toast({
            title: 'Ошибка',
            description: 'Не удалось загрузить данные активных групп.',
            status: 'error',
          });
        }
      }

      fetchActiveGroups();
    }
  }, [session]);

  function creatingActiveGroupObject(data) {
    if (data != null) {
      const result = data.reduce((acc, curr) => {
        acc[curr.id] = curr.groupNumber;
        return acc;
      }, {});
      return result;
    }
  }

  async function onSubmit(values) {
    console.log(values);

    if (status === 'authenticated') {
      setIsLoading(true);
      try {
        const requestData = {
          ...values,
          companyId: session.user.companyId,
          birthDate: dateParse(values.birthDate),
          documentIssueDate: dateParse(values.documentIssueDate),
          medicalIssueDate: dateParse(values.medicalIssueDate),
        };

        const response = await fetch('/api/student', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          toast({
            duration: 2000,
            description: 'Ученик успешно добавлен в БД',
          });
          reset();
        } else {
          toast({
            duration: 2000,
            variant: 'destructive',
            description: 'Ошибка при создании ученика',
          });
        }
      } catch (err) {
        toast({
          duration: 2000,
          variant: 'destructive',
          description: `Ошибка: ${err.message}`,
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full space-y-4">
        <div className="flex gap-4">
          <h2 className="text-lg font-semibold">📋 Создать нового ученика. Выбрать группу: </h2>
          {activeGroups ? (
            <DropdownField
              name="group"
              label="Выберете номер группы"
              control={form.control}
              options={creatingActiveGroupObject(activeGroups)}
            />
          ) : (
            <p>Загрузка...</p>
          )}
        </div>

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
          <InputField name="birthDate" label="Дата рождения (ДД/ММ/ГГГГ)" control={form.control} />
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
            label="Дата выдачи (ДД/ММ/ГГГГ)"
            control={form.control}
          />
        </div>

        <h3 className="text-md font-semibold">Медицинская справка</h3>
        <div className="grid grid-cols-3 gap-4">
          <InputField name="medicalSeries" label="Серия" control={form.control} />
          <InputField name="medicalNumber" label="Номер" control={form.control} />
          <InputField
            name="medicalIssueDate"
            label="Дата выдачи (ДД/ММ/ГГГГ)"
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

        <div className="flex gap-4">
          <Button variant="secondary" disabled={isLoading}>
            {isLoading ? 'Обновление...' : 'Обновить данные ученика'}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Добавление...' : 'Добавить ученика'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
