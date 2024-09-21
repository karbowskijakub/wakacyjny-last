import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
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
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/api";
import Banner from "@/components/Banner";
import { useNavigate } from 'react-router-dom'; 
import { toast } from "react-toastify";
import { useState } from "react";
import ResetPasswordPopup from "@/popups/ResetPasswordPopup";

const formSchema = z.object({
  email: z.string().email({ message: "Podaj prawidłowy adres email." }),
  password: z
    .string()
    .min(6, { message: "Hasło musi mieć co najmniej 6 znaków." }),
});
const LoginForm = () => {
  const [isResetPasswordPopupVisible, setResetPasswordPopupVisible] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      setLoginAttempts(0);
      navigate('/main');
    },
    onError: (error: Error) => {
      setLoginAttempts(prev => prev + 1);
      const attemptsLeft = 5 - (loginAttempts + 1);

      switch (error.message) {
       case "INVALID_CREDENTIALS":
          if (attemptsLeft > 0) {
            toast.error(`Nie udało się zalogować: Nieprawidłowy email lub hasło. Pozostało prób: ${attemptsLeft}`);
          } else {
            toast.error("Twoje konto zostało zablokowane z powodu wielu nieudanych prób logowania. Spróbuj ponownie później.");
          }
          break;
        case "ACCOUNT_LOCKED":
          toast.error("Twoje konto zostało zablokowane z powodu wielu nieudanych prób logowania. Spróbuj ponownie później.");
          break;
        case "ACCOUNT_NOT_CONFIRMED":
          toast.error("Twoje konto nie zostało jeszcze potwierdzone. Sprawdź swój e-mail i kliknij link aktywacyjny, aby aktywować konto.");
          break;     
        case "GENERAL_ERROR":
          toast.error("Wystąpił błąd podczas logowania. Spróbuj ponownie później.");
          break;
        case "UNEXPECTED_ERROR":
          toast.error("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.");
          break;
        default:
          toast.error("Wystąpił nieoczekiwany błąd.");
          break;
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutation.mutate(values);
  }
  const navigate = useNavigate();
  return (
    <section className="h-screen">
      <div className="flex h-full items-center justify-center">
        <Banner />
        <div className="flex h-full w-1/2 flex-col items-center justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zaloguj się</FormLabel>
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
              <div className="flex flex-col text-center ">
                <Button   variant="default" size="sm" type="submit">
                  Kontynuuj
                </Button>
                <p>
                  Nie posiadasz konta?{" "}
                  <Link to="/register">Zarejestruj się do WakacyjnyLast</Link>
                </p>
                <p className="text-center mt-4">
                <button
                  type="button"
                  className="text-blue-500 hover:underline"
                  onClick={() => setResetPasswordPopupVisible(true)}
                >
                  Nie pamiętasz hasła? Zresetuj hasło.
                </button>
              </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {isResetPasswordPopupVisible && (
        <ResetPasswordPopup isOpen={isResetPasswordPopupVisible} onClose={() => setResetPasswordPopupVisible(false)} />
      )}
    </section> 
  );
};

export default LoginForm;
