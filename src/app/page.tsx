
import GetCities from "@/actions/getdata/getData";
import DisplayCities from "@/components/homepage/DisplayCities";
import React from "react";


const Home = async () => {
  const cities: any = await GetCities();
  // console.log(city)
  return (
    <main className="min-h-screen bg-sky-600 pt-1 herosection">
      <DisplayCities allcity={cities.results} />
    </main>
  )
}

export default Home;