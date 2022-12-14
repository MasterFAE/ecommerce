import React, { useEffect } from "react";
import useSWR from "swr";
import AccountLayout from "../../components/AccountLayout";
import Loading from "../../components/Loading";
import fetcher from "../../lib/fetcher";

type Props = {};

const Reviews = (props: Props) => {
  //fetch reviews
  const { data: reviews, error } = useSWR(`/api/user/review`, fetcher);
  if (error) return <div></div>;
  return (
    <AccountLayout>
      <div className="col-span-12 row-start-4">
        <div className="flex flex-row gap-x-2">
          <div className="self-center rounded-lg bg-blue-400 px-2 py-[2px] text-center text-sm font-medium text-blue-900">
            WIP
          </div>
          <h1 className="self-end text-base text-neutral-600">Reviews</h1>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {!reviews ? (
            <div className="col-span-2 flex justify-center">
              <Loading></Loading>
            </div>
          ) : (
            <>
              {reviews && reviews.length > 0 ? (
                //reviews will render in this condition
                <></>
              ) : (
                <p className="col-span-2 text-center text-sm text-neutral-600">
                  You haven't made any review
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default Reviews;
