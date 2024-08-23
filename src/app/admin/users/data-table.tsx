'use client';

import RolePopover from '@/components/admin/users/role-popover';
import UserDropdownMenu from '@/components/admin/users/user-dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IUser } from '@/models/user';
import { User2 } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';

interface DataTableProps {
  data: IUser[];
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((d) => (
            <TableRow key={d.clerkId}>
              <TableCell>
                {d.image ? (
                  <Suspense
                    fallback={
                      <Skeleton className="w-[50] h-[50] rounded-full bg-gray-400" />
                    }
                  >
                    <Image
                      src={d.image}
                      alt="user image"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </Suspense>
                ) : (
                  <User2 />
                )}
              </TableCell>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.email}</TableCell>
              <TableCell>
                <RolePopover user={d} />
              </TableCell>
              <TableCell>
                <UserDropdownMenu user={d} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
