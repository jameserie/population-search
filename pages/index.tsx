import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import { Modal } from "react-responsive-modal";
import { useStore } from "../store/useStore";
import SearchGraphic from "../public/undraw_web_search_re_efla.svg";

type SelectList = {
  label: string;
  value: string;
  population: number;
  nation: string;
  nationId: string;
};

const Home: NextPage = ({ data }: any) => {
  const { selectedYear, setSelectedYear } = useStore((state: any) => ({
    selectedYear: state.selectedYear,
    setSelectedYear: state.setSelectedYear,
  }));

  const [population, setPopulation] = useState([]);
  const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    let populationData: SelectList[] = [];
    data.map((item: any) => {
      populationData.push({
        label: item.Year,
        value: item.Year,
        population: item.Population,
        nation: item.Nation,
        nationId: item["ID Nation"],
      });
    });

    setPopulation(populationData as any);
  }, [data]);

  return (
    <>
      <div className="container mx-auto">
        <Head>
          <title>United States Population</title>
          <meta
            name="description"
            content="A simple app that lets you find population in united states by year."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="my-20">
          <div className="flex items-center justify-center my-5">
            <Image
              src={SearchGraphic.src}
              width={500}
              height={300}
              alt="Search for Population"
            />
          </div>
          <div className="text-4xl mb-2 text-center font-bold">
            United States Population Finder
          </div>
          <Select
            value={selectedYear}
            onChange={(data) => {
              setSelectedYear(data as SelectList);
              setOpen(true);
            }}
            options={population}
          />
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="py-5 text-center">
          <div className="my-5 font-bold text-4xl">
            {selectedYear.nation} - {selectedYear.value}
          </div>
          <div className="text-2xl mb-10">
            Population: <strong>{selectedYear.population}</strong>
          </div>
          <div>
            <Link href={`year/${selectedYear.value}`}>
              <button className="btn-default">More Info</button>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const locationApi = `${process.env.API_URL}/us-population`;
    const response = await fetch(locationApi);
    const data = await response.json();

    return {
      props: { data: data.data },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
