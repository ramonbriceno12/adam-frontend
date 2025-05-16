'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"form">) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        type: ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setForm(prev => ({ ...prev, [id]: value }))
    }

    const register = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Registration failed")
            }

            setSuccess(true)
            setForm({ name: "", email: "", password: "", type: "" })
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={register} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create Account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email password and user type below to create an account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="type">User Type</Label>
                    <Select
                        value={form.type}
                        onValueChange={(value) => setForm({ ...form, type: value })}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="accountant">Accountant</SelectItem>
                                <SelectItem value="restaurant">Restaurant</SelectItem>
                                <SelectItem value="dark-kitchen">Dark Kitchen</SelectItem>
                                <SelectItem value="store">Store</SelectItem>
                                <SelectItem value="online-store">Online Store</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </Button>
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                {success && (
                    <p className="text-green-600 text-sm text-center">
                        Registered successfully!
                    </p>
                )}
                {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button> */}
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    )
}
