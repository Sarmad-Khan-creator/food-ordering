import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function SSOCallback() {
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom OAuth flow.
  return (
    <div className="flex items-center justify-center">
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl'>You are being authenticated...</h1>
        <Loader2 size={40} className="animate-spin" />
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
