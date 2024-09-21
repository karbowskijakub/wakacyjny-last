import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email({ message: "Podaj prawidłowy adres email." }),
  oldPassword: z.string().min(6, { message: "Hasło musi mieć co najmniej 6 znaków." }),
  newPassword: z.string().min(6, { message: "Nowe hasło musi mieć co najmniej 6 znaków." }),
  confirmNewPassword: z.string().min(6, { message: "Potwierdź nowe hasło." }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Hasła muszą się zgadzać.",
  path: ["confirmNewPassword"],
});

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId') ?? '';
  const resetCode = searchParams.get('code') ?? '';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Hasło zostało pomyślnie zmienione!");
      navigate("/login");
    },
    onError: () => {
      toast.error("Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, newPassword } = values;
    if (userId && resetCode) {
      mutation.mutate({ email, resetCode, newPassword });
    } else {
      toast.error("Brakujące parametry w URL.");
    }
  }

  return (
    <section className="h-screen w-full flex justify-center items-center bg-primary">
      <div className='absolute top-12 text-center'>
        <h1 className="text-3xl lg:text-6xl font-bold text-primary-foreground no-underline">
          Typujemy<span className="text-customYellow">Razem</span>
        </h1>
      </div>
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-lg mt-24">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Zmień Hasło</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Podaj swój adres email" className="w-full py-3 px-4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stare Hasło</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Wpisz stare hasło" className="w-full py-3 px-4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nowe Hasło</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Wpisz nowe hasło" className="w-full py-3 px-4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Powtórz Nowe Hasło</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Powtórz nowe hasło" className="w-full py-3 px-4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full py-3 rounded-md" variant="additionalMethod">
              Zmień Hasło
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ResetPasswordForm;
