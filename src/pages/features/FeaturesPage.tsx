import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FeaturesHeader from "@/components/features/FeaturesHeader";
import FeaturesTable from "@/components/features/FeaturesTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { getFeatures, FeaturesResponse } from "@/api/featuresApp/getFeatures";
import Loading from "@/components/general/Loading";

const FeaturesPage = () => {
  const [page, setPage] = useState(1);
  const {
    data: featuresData,
    isLoading,
    error,
    refetch,
  } = useQuery<FeaturesResponse, Error>({
    queryKey: ["features", page],
    queryFn: () =>
      getFeatures({
        pagination: "normal",
        page,
      }),
  });

  const features = featuresData?.data || [];
  const perPage = featuresData?.meta?.per_page || 15;
  const totalItems = featuresData?.meta?.total || features.length;
  const totalPages = featuresData?.meta?.last_page || 1;
  const from = featuresData?.meta?.from || 1;
  const to = featuresData?.meta?.to || features.length;

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading features: {String(error.message)}</div>;

  return (
    <div className="md:px-8 px-2">
      <FeaturesHeader />
      <div className="px-2 md:px-8">
      <FeaturesTable features={features} refetch={refetch} />
          {totalItems > 0 && (
            <TablePagination
              currentPage={page}
              setCurrentPage={setPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={perPage}
              from={from}
              to={to}
            />
          )}
        </div>
    </div>
  );
};

export default FeaturesPage;
