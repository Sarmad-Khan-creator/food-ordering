'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';

type Props = {
  placeholder: string;
};

const Search = ({ placeholder }: Props) => {
  const [value, setValue] = useState('');
  return (
    <div className="border border-gray-500 w-[400px] rounded-md pr-2 flex items-center gap-2">
      <Input
        type="text"
        placeholder={`Search for ${placeholder}`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="border-none focus-visible:ring-0"
      />
      <SearchIcon />
    </div>
  );
};

export default Search;
