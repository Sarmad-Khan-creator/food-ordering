import { getAllUsers } from '@/actions/user.action';
import Search from '@/components/search/search';
import { Plus } from 'lucide-react';
import React from 'react';
import { DataTable } from './data-table';


const Users = async () => {
  const users = await getAllUsers();
  return (
    <section className="w-full flex-1 overflow-y-auto px-5 py-6">
      <h1 className="text-3xl font-semibold mb-3">All Users</h1>
      <Search placeholder="Users" />
      <div className="mt-5">
        <DataTable data={JSON.parse(users)} />
      </div>
    </section>
  );
};

export default Users;
