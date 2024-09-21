import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { checkEmailExists, sendResetPasswordEmail } from "@/api/api";
import { toast } from 'react-toastify'

interface ResetPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordPopup: React.FC<ResetPasswordPopupProps> = ({ isOpen, onClose }) => {
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: (emailData: { email: string }) => sendResetPasswordEmail(emailData),
        onSuccess: () => {
            toast.success('Link potwierdzający został wysłany na Twój adres e-mail.');
            onClose();
        },
        onError: () => {
            toast.error('Wystąpił błąd podczas wysyłania e-maila. Spróbuj ponownie później.');
        }
    });

    useEffect(() => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailPattern.test(email));
    }, [email]);

    const handleSendEmail = async () => {
        if (!isButtonDisabled) {
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                mutation.mutate({
                    email: email,
                });
            } else {
                toast.error('Brak wyników wyszukiwania. Wyszukiwanie nie przyniosło żadnych wyników. Spróbuj ponownie przy użyciu innych informacji.');
            }
        }
    };

    const isButtonDisabled = !(recaptchaToken && isEmailValid);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button variant="outline">Zapomniałeś hasła?</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-lg flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Zresetuj hasło</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 w-full">
                    <div className="grid-cols-4 items-center gap-4 w-full">
                        <Label htmlFor="reset-email" className="text-right col-span-1">
                            Email
                        </Label>
                        <Input
                            placeholder="Podaj adres e-mail"
                            id="reset-email"
                            className="col-span-3 mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center my-5">
                    <ReCAPTCHA
                        sitekey={"6Ld64h4qAAAAAPr-DqYZyv_HFj9sKmpu2tymJ2pW"}
                        onChange={(val) => setRecaptchaToken(val)}
                    />
                </div>
                <div className="justify-center">
                    <DialogFooter className="flex justify-center gap-4 w-full">
                        <Button disabled={isButtonDisabled} type="submit" onClick={handleSendEmail}>Wyślij link potwierdzający</Button>
                    </DialogFooter>
                </div> 
            </DialogContent>
        </Dialog>
    );
};

export default ResetPasswordPopup;
