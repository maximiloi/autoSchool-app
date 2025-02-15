const { z } = require('zod');

const MIN_AGE = 16;
const currentDate = new Date();
const minBirthDate = new Date(
  currentDate.getFullYear() - MIN_AGE,
  currentDate.getMonth(),
  currentDate.getDate(),
);

export const formSchema = z.object({
  lastName: z.string().min(2, 'Введите фамилию'),
  firstName: z.string().min(2, 'Введите имя'),
  phone: z.string().min(10, 'Введите телефон'),
  group: z.string().nonempty('ID группы обязателен'),
  trainingCost: z.string().min(2, 'Введите сумму'),
  birthDate: z
    .string()
    .regex(/^(\d{2})\/(\d{2})\/(\d{4})$/, 'Введите корректную дату в формате ДД/ММ/ГГГГ')
    .refine((dateString) => {
      if (!dateString) return true; // Пропускаем проверку, если поле пустое
      const [day, month, year] = dateString.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      return birthDate <= minBirthDate;
    }, `Возраст должен быть не менее ${MIN_AGE} лет`),

  middleName: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  snils: z.string().optional(),
  birthPlace: z.string().optional(),
  registrationAddress: z.string().optional(),
  actualAddress: z.string().optional(),
  documentType: z.enum(['passport', 'license']).optional(),
  documentIssuer: z.string().optional(),
  documentCode: z.string().optional(),
  documentSeries: z.string().optional(),
  documentNumber: z.string().optional(),
  documentIssueDate: z.string().optional(),
  // .regex(/^(\d{2})\.(\d{2})\.(\d{4})$/, 'Введите корректную дату в формате ДД.ММ.ГГГГ'),
  medicalSeries: z.string().optional(),
  medicalNumber: z.string().optional(),
  medicalIssueDate: z.string().optional(),
  // .regex(/^(\d{2})\.(\d{2})\.(\d{4})$/, 'Введите корректную дату в формате ДД.ММ.ГГГГ'),
  medicalIssuer: z.string().optional(),
  license: z.string().optional(),
  licenseSeries: z.string().optional(),
  licenseNumber: z.string().optional(),
  region: z.string().optional(),
  medicalRestriction: z.string().optional(),
  allowedCategories: z.string().optional(),
});
