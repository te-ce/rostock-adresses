import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { City } from "../App";
import { useMemo } from "react";

/**
 * Function for generating the cities table data.
 */
export function useCitiesTable(data: City[]) {
  
  // Define the columns for the table
  const columns = useMemo<ColumnDef<City>[]>(
    () => [
      {
        id: "PLZ",
        accessorFn: (city) => city.postleitzahl,
        header: "PLZ",
        cell: ({ getValue }) => getValue(),
      },
      {
        id: "Gemeindeteil",
        accessorFn: (city) => city.gemeindeteil_name,
        header: "Gemeindeteil",
        cell: ({ getValue }) => getValue(),
      },
      {
        id: "Straße",
        accessorFn: (city) => city.strasse_name,
        header: "Straße",
        cell: ({ getValue }) => getValue(),
      },
      {
        id: "Nr",
        accessorFn: (city) => city.hausnummer,
        header: "Nr",
        cell: ({ getValue }) => getValue(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return table;
}
