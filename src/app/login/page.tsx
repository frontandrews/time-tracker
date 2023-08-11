import { Input } from "@nextui-org/input";
import { Link } from '@nextui-org/link'

export default function Login() {
    return (
      <div className="flex flex-center justify-center">
        <div className="min-w-[680px] mt-36 items-left justify- flex flex-col space-y-5">
        <label>Login</label>
        <Input />
        <label>Password</label>
        <Input type="password" />

        <div className="flex space-x-4 justify-end">
          <Link href="/register">Register</Link>
          <Link href="/recover-password">Recover Password</Link>
        </div>
      </div>
      </div>
    )
  }
  