import { Input } from "@nextui-org/input";
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'

export default function RecoverPassword() {
    return (
      <div className="flex flex-center justify-center">
        <div className="md:min-w-[280px] mt-36 items-left flex flex-col space-y-5">
          <label>Email</label>
          <Input />
          <Button color="primary">Send</Button>
        </div>
      </div>
    )
  }
  