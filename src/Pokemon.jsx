import { useEffect, useState } from "react"
import { PokemonCards } from "./PokemonCards"
import "./index.css"
import { loaders } from "./components/Loaders"
import toast from "react-hot-toast"
import SearchIcon from "@mui/icons-material/Search";

export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    const API = "https://pokeapi.co/api/v2/pokemon?limit=100"


    const fetchPokemon = async () => {
        try {
            const res = await fetch(API)
            const data = await res.json()

            const pokemonDetails = await Promise.all(
                data.results.map(async (curr) => {
                    const res = await fetch(curr.url)
                    return await res.json()
                })
            )
            setTimeout(() => {
                setPokemon(pokemonDetails)
                toast.success("Success!")
                setLoading(false)
            }, 1000)
        } catch (e) {
            setLoading(false)
            toast.error(`Failed to fetch Pokemon data: ${e.message}`);
        }
    }

    useEffect(() => {
        document.title = 'List of Pokemons!'
        fetchPokemon()
    }, [])

    //Search Functionality
    const searchData = pokemon.filter((curr) => {
        const nameMatch = curr.name.toLowerCase().includes(search.toLowerCase());
        const types = curr.types.map(t => t.type.name.toLowerCase()).join(' ');
        const typeMatch = types.includes(search.toLowerCase())

        return nameMatch || typeMatch
    });

    if (loading) {
        return (
            <div className="loading flex justify-center items-center h-screen bg-gray-500">
                {loaders()}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-500 flex flex-col items-center p-6">
            <header className="mb-8">
                <h1 className="text-center text-white text-4xl font-bold">
                    Pokémons!
                </h1>
            </header>
            <div className="relative mb-10">
                <input
                    type="text"
                    placeholder="Search Pokémons!"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-10 w-full px-10 rounded-md bg-white border border-gray-300 focus:outline-none"
                />
                <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>


            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[90rem]">
                {/* {pokemon.map((poke) => ( */}
                {searchData.map((poke) => (
                    <PokemonCards key={poke.id} data={poke} />
                ))}
            </ul>
        </div>
    )
}
