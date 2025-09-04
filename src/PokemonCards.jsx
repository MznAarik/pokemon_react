import { useState } from "react"

export const PokemonCards = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get Pokemon type for dynamic styling
  const primaryType = data?.types?.[0]?.type?.name || 'normal';

  // Type-based color schemes
  const typeColors = {
    normal: 'from-gray-400 to-gray-600',
    fire: 'from-red-400 to-orange-600',
    water: 'from-blue-400 to-cyan-600',
    electric: 'from-yellow-500 to-lime-900',
    grass: 'from-green-400 to-emerald-600',
    ice: 'from-cyan-300 to-blue-400',
    fighting: 'from-red-600 to-red-800',
    poison: 'from-purple-400 to-purple-600',
    ground: 'from-yellow-600 to-zinc-500',
    flying: 'from-indigo-300 to-blue-400',
    psychic: 'from-pink-400 to-purple-500',
    bug: 'from-green-500 to-lime-600',
    rock: 'from-yellow-700 to-gray-600',
    ghost: 'from-purple-600 to-indigo-800',
    dragon: 'from-indigo-600 to-purple-700',
    dark: 'from-gray-700 to-black',
    steel: 'from-gray-500 to-slate-600',
    fairy: 'from-pink-300 to-rose-400'
  };

  const gradientClass = typeColors[primaryType] || typeColors.normal;

  return (
    <li className="group relative">
      {/* Animated background glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientClass} rounded-tl-xl rounded-br-xl blur opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-200 animate-pulse`}></div>

      {/* Main card */}
      <div className="gap-4 w-full relative bg-white rounded-tl-4xl rounded-br-4xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 cursor-pointer overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`h-full w-full bg-gradient-to-br ${gradientClass}`}></div>
        </div>

        {/* Floating orbs animation */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-white to-gray-200 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-8 right-8 w-2 h-2 bg-gradient-to-r from-white to-gray-200 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.5s' }}></div>

        <div className="relative flex flex-col items-center p-8">
          {/* Pokemon Image with loading animation */}
          <div className="relative mb-6 group">
            <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
            <div className={`relative w-36 h-36 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-inner flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 ${!imageLoaded ? 'animate-pulse' : ''}`}>
              <img
                src={data?.sprites?.other?.dream_world?.front_default || data?.sprites?.other?.['official-artwork']?.front_default}
                alt={data.name}
                className={`h-28 w-28 object-contain transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-gray-300 border-t-cyan-500 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>

          {/* Pokemon Info */}
          <div className="text-center space-y-3 w-full">
            <h3
              className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent 
              font-semibold text-xl capitalize tracking-wide
              transition-all duration-300 group-hover:scale-105 group-hover:font-bold`}
            >
              {data.name}
            </h3>

            {/* Pokemon Types */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {data?.types?.map((typeInfo) => (
                <span
                  key={typeInfo.type.name}
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${typeColors[typeInfo.type.name] || typeColors.normal} shadow-sm transform transition-all duration-200 hover:scale-105`}
                >
                  {typeInfo.type.name.toUpperCase()}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 w-full" >
              <p className={`me-2 mb-2 font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                Height: <br />{data.height}</p>
              <p className={`me-2 mb-2 font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                Weight:<br /> {data.weight}</p>
              <p className={`me-2 mb-2 font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                Speed: <br /> {data.stats[5].base_stat}</p>
            </div>

            <div className="grid grid-cols-3 w-full overflow-visible" >
              {console.log(data)}
              <p className={`me-2 mb-2 font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                {data.base_experience}  Experience</p>
              <p className={`me-2 mb-2 font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                {data.stats[1].base_stat} <br />  Attack</p>
              <p className={`me-2 mb-2 font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                {data?.abilities?.[0]?.ability?.name || 'Unknown'} Ability
              </p>

            </div>

          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
      </div>
    </li >
  )
}
