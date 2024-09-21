import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { postRegister, checkEmailExists } from "@/api/api";
import Banner from "@/components/Banner";
import { toast } from "react-toastify";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const passwordValidation = z
  .string()
  .min(6, { message: "Hasło musi mieć co najmniej 6 znaków." })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Hasło musi zawierać co najmniej jedną wielką literę ('A'-'Z').",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Hasło musi zawierać co najmniej jedną cyfrę ('0'-'9').",
  })
  .refine((value) => /[^a-zA-Z0-9]/.test(value), {
    message: "Hasło musi zawierać co najmniej jeden znak specjalny.",
  });

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "To pole musi mieć co najmniej 2 znaki." })
    .max(50, {
      message: "To pole nie może mieć więcej niż 50 znaków.",
    }),
  lastName: z
    .string()
    .min(2, { message: "To pole musi mieć co najmniej 2 znaki." })
    .max(50, {
      message: "To pole nie może mieć więcej niż 50 znaków.",
    }),
  email: z.string().email({ message: "Podaj prawidłowy adres email." }),
  password: passwordValidation,
  terms: z.boolean().refine((value) => value === true, {
    message: "Musisz zaakceptować politykę prywatności.",
  }),
});

const RegisterForm = () => {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
  });


  const mutation = useMutation({
    mutationFn: postRegister,
    onSuccess: async () => {
      try {
        form.reset();
        toast.success("Rejestracja przebiegła pomyślnie! Na podanego maila wysłaliśmy wiadomość z linkiem aktywującym konto.");
      } catch (error) {
        console.error("Error during additional registration steps:", error);
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const emailExists = await checkEmailExists(values.email);
  
      if (emailExists) {
        toast.error("Podany e-mail jest już zarejestrowany.");
        return;
      }
  
      mutation.mutate(values);
    } catch (error) {
      toast.error("Wystąpił błąd podczas walidacji e-maila.");
    }
  };

  return (
    <section className="h-screen">
      <div className="flex h-full items-center justify-center">
        <Banner />
        <div className="flex h-full w-1/2 flex-col items-center justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zarejestruj się</FormLabel>
                    <FormControl>
                      <Input placeholder="Imię" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nazwisko" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Hasło" 
                          {...field} 
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <i className="fas fa-eye-slash"></i>
                          ) : (
                            <i className="fas fa-eye"></i>
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <div className="flex justify-center my-5">
                  <ReCAPTCHA
                    sitekey={"6Ld64h4qAAAAAPr-DqYZyv_HFj9sKmpu2tymJ2pW"}
                    onChange={(val) => setRecaptchaToken(val)}
                  />
                </div>
              <div className="flex flex-col text-center">
                <Button disabled={!recaptchaToken} className="mb-3" size="lg" type="submit">
                  Zarejestruj się
                </Button>
              </div>
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center">
                        <div className="items-top flex space-x-2">
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Rejestrując się potwierdzasz politykę prywatności.
                            </label>
                            <span className="text-center text-sm font-medium">
                              Posiadasz już konto?{" "}
                              <Link to="/login">Zaloguj się</Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage className="flex justify-center" />
                  </FormItem>
                )}
              />
            
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
