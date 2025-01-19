import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomForm from './CustomForm';
import { Category } from './types';

type BaseData = {
  firstName: string;
  lastName: string;
  category: Category;
};

type EmailData = BaseData &
  (
    | {
        includeEmail: false;
      }
    | {
        includeEmail: true;
        email: string;
      }
  );

type CategoryData = EmailData &
  (
    | {
        category: Category.Fire;
        includeEmail: true;
        email: string;
      }
    | {
        category: Category.Water;
        waterName: string;
      }
    | {
        category: Category.Air;
        airName: string;
      }
  );

type FileData = CategoryData &
  (
    | {
        includeFile: true;
        file: File;
      }
    | {
        includeFile: false;
      }
  );

type Data = FileData;

const baseSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const withoutEmailSchema = baseSchema.extend({
  includeEmail: z.literal(false).default(false),
});

const withEmailSchema = baseSchema.extend({
  includeEmail: z.literal(true),
  email: z.string().email(),
});

const firstSchema = z.discriminatedUnion('includeEmail', [
  withoutEmailSchema,
  withEmailSchema,
]);

const FireSchema = baseSchema.extend({
  category: z.literal(Category.Fire),
  includeEmail: z.literal(true),
  email: z.string().email(),
});

const WaterSchema = baseSchema.extend({
  category: z.literal(Category.Water),
  waterName: z.string(),
});

const AirSchema = baseSchema.extend({
  category: z.literal(Category.Air),
  airName: z.string(),
});

const CategorySchema = z.discriminatedUnion('category', [
  FireSchema,
  WaterSchema,
  AirSchema,
]);

const withoutFileSchema = baseSchema.extend({
  includeFile: z.literal(false).default(false),
});

const withFileSchema = baseSchema.extend({
  includeFile: z.literal(true),
  file: z.instanceof(File, { message: 'Upload a valid file' }),
});

const FileSchema = z.discriminatedUnion('includeFile', [
  withoutFileSchema.passthrough(),
  withFileSchema.passthrough(),
]);

const testSchema = [baseSchema, firstSchema, FileSchema, CategorySchema];

const schema = z.custom<Data>().superRefine((data, ctx) => {
  testSchema.forEach((schema) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach(ctx.addIssue);
    }
  });
});

const FormSchema = schema;

type FormSchemaType = z.infer<typeof FormSchema>;

export default function MultipleDiscriminatedValue() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      includeEmail: false,
      category: undefined,
      includeFile: false,
    },
  });

  function onSubmit(values: FormSchemaType) {
    console.log(values);
  }

  return <CustomForm form={form} onSubmit={onSubmit} />;
}
