import FeaturesHeader from "@/components/features/FeaturesHeader";
import FeaturesTable from "@/components/features/FeaturesTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getFeatures, Feature } from "@/api/featuresApp/getFeatures";
import Loading from "@/components/general/Loading";

const FeaturesPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const perPage = 15;

  const { data, isLoading, error, refetch } = useQuery<Feature[], Error>({
    queryKey: ["features", currentPage, perPage],
    queryFn: () => getFeatures(currentPage, perPage),
    placeholderData: keepPreviousData,
  });

  const features: Feature[] = (data ?? []) as Feature[];

  const totalItems = features.length;
  const totalPages = Math.ceil(totalItems / perPage);



  if (isLoading) return <Loading />;
  if (error) return <div>Error loading features: {String(error.message)}</div>;

  return (
    <div className="md:px-8 px-2">
      <FeaturesHeader />
      <FeaturesTable features={features} refetch={refetch} />
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={perPage}
        from={(currentPage - 1) * perPage + 1}
        to={Math.min(currentPage * perPage, totalItems)}
      />
    </div>
  );
};

export default FeaturesPage;
