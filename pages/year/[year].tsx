import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "../../store/useStore";

const Year = () => {
  const router = useRouter();
  const { year } = router.query;

  const { selectedYear } = useStore((state: any) => ({
    selectedYear: state.selectedYear,
  }));

  return (
    <>
      <Head>
        <title>{year} | United States Population</title>
        <meta
          name="description"
          content={`United States population for year ${year}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <div className="bg-white rounded-lg p-10 mt-20 text-2xl">
          <div>
            <strong>Year:</strong> {year}
          </div>
          <div>
            <strong>Nation ID:</strong> {selectedYear.nationId}
          </div>
          <div>
            <strong>Nation:</strong> {selectedYear.nation}
          </div>
          <div>
            <strong>Population:</strong> {selectedYear.population}
          </div>
          <div className="mt-10 text-sm">
            <Link href="/">
              <button className="btn-default">Back to home</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Year;
