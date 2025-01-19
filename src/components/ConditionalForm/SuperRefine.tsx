import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "./types";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    category: z.nativeEnum(Category),
    includeEmail: z.boolean().default(false),
    email: z.string().email().optional(),
    waterName: z.string().optional(),
    airName: z.string().optional(),
    includeFile: z.boolean().default(false),
    file: z.instanceof(File).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.category === "Fire") {
      if (!data.email) {
        ctx.addIssue({
          code: "custom",
          message: "Email required when Fire",
          path: ["email"],
        });
      }
    }

    if (data.category === "Water" && !data.waterName) {
      ctx.addIssue({
        code: "custom",
        message: "Water name is required for Water category",
        path: ["waterName"],
      });
    }

    if (data.category === "Air" && !data.airName) {
      ctx.addIssue({
        code: "custom",
        message: "Air name is required for Air category",
        path: ["airName"],
      });
    }

    if (data.includeEmail) {
      if (!data.email) {
        ctx.addIssue({
          code: "custom",
          message: "Email is required when include email is checked",
          path: ["email"],
        });
      }
    }

    if (data.includeFile) {
      if (!data.file) {
        ctx.addIssue({
          code: "custom",
          message: "File is required when include file is checked",
          path: ["file"],
        });
      }
    }
  });

export type FormSchemaType = z.infer<typeof FormSchema>;

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

  const { control, handleSubmit, watch, setValue } = form;

  const includeEmail = watch("includeEmail");
  const category = watch("category");
  const includeFile = watch("includeFile");

  return (
    <div>
      Super Refine
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Fistname */}
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {/* Lastname */}
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {/* email option */}
          <FormField
            control={control}
            name="includeEmail"
            render={({ field }) => (
              <FormItem className="space-y-4 space-x-2">
                <FormLabel>Include Email?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={category === "Fire"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* email */}
          {includeEmail && ( // Conditionally render the email field
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {/* select category */}
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value == "Fire") {
                      setValue("includeEmail", true, { shouldValidate: true });
                    }
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Category).map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {/* watername */}
          {category === "Water" && (
            <FormField
              control={control}
              name="waterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Watername</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          )}
          {/* Air name */}
          {category === "Air" && (
            <FormField
              control={control}
              name="airName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Airname</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          )}
          {/* include file? */}
          <FormField
            control={control}
            name="includeFile"
            render={({ field }) => (
              <FormItem className="space-y-4 space-x-2">
                <FormLabel>Include File?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={category === "Fire"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* File */}
          {includeFile && ( // Conditionally render the file field
            <FormField
              control={control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(event) =>
                        field.onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="pt-4">
            <Button type="submit" className="">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
