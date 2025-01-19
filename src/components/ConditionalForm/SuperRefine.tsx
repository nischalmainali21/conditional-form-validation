import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomForm from './CustomForm';
import { Category } from './types';

const FormSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    category: z.nativeEnum(Category),
    includeEmail: z.boolean().default(false),
    email: z.string().email().optional(),
    waterName: z.string().optional(),
    airName: z.string().optional(),
    includeFile: z.boolean().default(false),
    file: z.instanceof(File).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.category === 'Fire') {
      if (!data.email) {
        ctx.addIssue({
          code: 'custom',
          message: 'Email required when Fire',
          path: ['email'],
        });
      }
    }

    if (data.category === 'Water' && !data.waterName) {
      ctx.addIssue({
        code: 'custom',
        message: 'Water name is required for Water category',
        path: ['waterName'],
      });
    }

    if (data.category === 'Air' && !data.airName) {
      ctx.addIssue({
        code: 'custom',
        message: 'Air name is required for Air category',
        path: ['airName'],
      });
    }

    if (data.includeEmail) {
      if (!data.email) {
        ctx.addIssue({
          code: 'custom',
          message: 'Email is required when include email is checked',
          path: ['email'],
        });
      }
    }

    if (data.includeFile) {
      if (!data.file) {
        ctx.addIssue({
          code: 'custom',
          message: 'File is required when include file is checked',
          path: ['file'],
        });
      }
    }
  });

type FormSchemaType = z.infer<typeof FormSchema>;

export default function SuperRefine() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      includeEmail: false,
      category: undefined,
      email: undefined,
      waterName: undefined,
      airName: undefined,
      includeFile: false,
      file: undefined,
    },
  });

  function onSubmit(values: FormSchemaType) {
    console.log(values);
  }

  return <CustomForm onSubmit={onSubmit} form={form} />;
}
