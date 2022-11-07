import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type Props = {};

const AddressItem = (props: Props) => {
  return (
    <div className="flex flex-col rounded-md border border-l-8 border-l-blue-600 p-2 px-4">
      <div className="mb-1 flex flex-row items-center justify-between border-b pb-1">
        <h1 className="self-end text-lg font-medium text-neutral-900">
          Address Name 1
        </h1>
        <div>
          <button className="mx-2 rounded-lg border border-red-600 p-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white">
            <FaTrash size={14} />
          </button>
          <button className="rounded-lg border border-blue-600 bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600">
            <FaEdit size={14} className="ml-[15%]" />
          </button>
        </div>
      </div>
      <div className="px-2 text-sm text-neutral-800">
        <p className="line-clamp-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
          exercitationem, consequuntur deserunt eum possimus molestias corporis
          veritatis pariatur quia repellendus rerum fugiat fugit voluptatem
          excepturi amet temporibus sequi laudantium laborum.
        </p>
        <h4>Çankaya</h4>
        <h4>Ankara</h4>
        <h4>26170</h4>
      </div>
    </div>
  );
};

export default AddressItem;
