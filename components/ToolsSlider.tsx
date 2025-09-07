"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const tools = [
  {
    title: "Calories Calculator",
    description:
      "Calculate your daily calorie needs based on weight, height, age, and activity level.",
    link: "/clients/tools/calories",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.2jrjbYAFSnEXstJa3AwlPAHaE8?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3",
    allowedPackages: ["Standard", "Premium"],
  },
  {
    title: "BMI Calculator",
    description: "Check your Body Mass Index (BMI).",
    link: "/clients/tools/bmi",
    image:
      "data:image/webp;base64,UklGRhQXAABXRUJQVlA4IAgXAABwZgCdASovAS8BPp1MoEwlpCMio5iaQLATiU3fiNtslOLk0rVB0eyHz/KU9a+P+o/Nb2V/0v756lfVP+lv+r7gn61+dv6mfMH/Qf8r6qH+s/bf3P/3H/O+wL/Sv+D1lHoO+Xh7Nn9a/5X7v+1DqoTOP9v0vnvGZO4K6mvyv78eg/bt/Q97/AC/Jf65uu4Af0j+79/jqa+H/YA8vu+u/B/8j2AP5t6QH+d5Ffrz2FelF+7PsqkWGnOhPNq83u/3jpIuGd/vLDxfvHEmPz8bB18uVUyXncClzGrzp8243D2ePQX3Vjl/hlXIVeterWvqI8FqotZYJP1ZL6tLdPhhweQmRh9logi8wCU78B7ogrnquHLM2pln5U+9CAXFK5n804eSjYvj2PENCIaDdy+/fO9hGmQeCmk+V7x0/t61bUuxm1nT0aygZYMA5124sPPGlXzFgHtaebxIfUXcldsBIq+FuMM2NCfdyk1C88QHPfZjot4GTdosdOUrEUl1reab1w+LuRNXm9ynGU7/arhs6uenctztZxmgEvqBJGKCmniYQfIe/KXu/3hW3tLDhXCO8DdEVzzPGFKDO/AK2kiRft7MRtjKyEvObjDjJPqU/cH+yWE3IfJeYTauhdH2QQC9yhkxMvrzOh6EhfvHEQfiMhrZGtFV6rx+VSQGwzmMM507b7HRm8TdYmZYdiB+CQ/X0nj/VIGpYcy2znyUIauQgVLlobs7Rt99wAAGq63YeCRZfPPrOq8ykZIkAiIRf1CMhJ9Uxd0wE3gSiNmBXxqdR6Dxwxq74Fc9hl41xx1yl7CE0z7nTupuEnKfHmyXjowmwM8P+hzeDOhO8Fqfkgim+TZP/R//ySb0Uh13ltfdm5L/AMLb+DpVi5kTteUM0hTkiRYy2N31dF1m4wRHZaNhjItq7CZu5dV3FPYAI2h1+5yB0AlJY6aAOrrtWY87Bc13q/0zLGtbhnz5gm+fY0kR644888nSLMyWahqvwnnRouqABYK241ckpCcChj15ptj42YI1M0EMSLknTk99b2rXTBx/VmAMExBFDyGbqjZfhrcI25EIv4ick+g8STK3ouOAkX7xt7mVPh2oV5vdAAAA/bWv/6Qx/8Qx/8Qxor/8VtQdN3HZd5hGTmBJ/+PnfOlQAP7JFTMD1Xgz2hsN2ab+zP9ft2AdVnQqepv5Y58gElwCKBAIjjGLjX5WlT+AEHWCi4bPMRdjZOoEKpMtml2gZYYGfJoBzK6nOn2hezL56TVq74mZ+cGNqGRfv9b70yIOAS3M3KAmIJiIM1fam5TFx9HsElGwIPKhTjpJv/4ueVf5khT5W6IqBrKKDVGDDeHTPAW5lPsoJ9BEcsGeUZcwQ8qYjfBs+gAQuMQ22z+58XpNwCSCQF/niYHFIIrfhfy++XSfG/Qm3HwieGvsy3WFscr5CEGn3nQtww7vSKOHoLynU3nsXExnE5wnlK3W26EmiMKaGeb6wPzgd9taqfqQ/NDmfGiXL8m5Ba+USMBqxY+ucX6jveYaiGDyI2gQAeYEgpDElb2XISVR6O2YTn6/ISJ3V3RcpLimllA2EIVd9vdbh9WY2rnF1r7hDN/dVH8u3Nj430Xs4bSbX7r3cTmuJGwKshjjKxjjqqCxgoxzA5YGGT1DPJHbmoyQ8m4Y3vvBjf7JBad8bn0m0EH0TtZCOYY1cw0HBxBJ23A33xVIc4fqa1oS+tHDmBJj++oLFLM35uCpKKkZ8U0xzgmk55WS/HTHQoMGAbyKcwMMr7payms2prPAe56m2FBLv8GovxFuf0M1Avkl9tjQAJuzongN25cI4WeS10yl+iiKo+vL71hiLwqsx5pSrbifjhV0tkHc//Lfs5yyMkmajOiITeJfmHDDn8waG/wD/ZwVo4Uty3RVtOM+MbFBLkJHbLk9miJNkFdRKUyQmOcwaJwS7gmc4mlQGNikmfklkV0Cda1z9gKyKdbVVFpGe/7xviqJW7X4wsymMQ1yaxPxOtS8QfNrl/9Nb1+jULxZMG/IawZObB0tBDW2O+W3ZYzuKuZh0SDftDOvrOF/5QnqdJFniI+kaNwUWMskZXqIPxL8YjsY15H8PnTMcP1+UtsFZDIaO6zpSegL9jBcI4Gxz03use6v1FfELCGKZj28L/CXJEbYJRkR75PF5h4Ajy0rHHxKpOEYZCFa0MG10ZAdbos/j/j+sICh634NgQRS9xYwgN36eo6cICm6abB77yasY5aYBJadsbabV/BavpN9j3Adzk8AnUiYREPUUbb/WEeT5YE/V4xb8sy+3JYAfEVMXtqzq9igQbZzGelLs7TLIOLX4OUpNdAx67Rd234J3xVWkUGz19MDfMmbXavvI3P9U7CYL+kgqN+TkrmklJpS3BThNbkhE6rq2S99WOfTf+9S6c8fdn5bSu/KSSUoRgZKvpvC3waY+/UgAhPZA0LbcZnFiYuxHVBYI1zPP7PxPcTkI+WQAdhnJ2x2Ar5hIsh8jmakN9KajBzyKv8pb7NN8zDboYO7CIVAOM1lGDKG/v/2CHcax0g1eL1fgllOnOa1uoV6Rv6PDlgkjzQTKriNanXmR4zbVZa7TofcQemQ0tvFoHiWbBxYvuyOTfto9/HFtZJ7EFE/ZDovXrOU87K2CnNNiIwSbt0HN9Vrd0cfDb1qt46E7i0SX7ZV+f2paEi7W2pqqIRxFwvCTDn2IN+E87Kisi4ixOsKPYkDq+wm7ptHRMTy5jieDX61b/1/UcMv3Emvh+HddLoB9+Pmu2GofwGsuCG2T//kfh5UhPX4ieTleJUcEDTvEaQmerpa9rP/rCey6ayGpaWRvx8i/4Sx08JX68DcrUrEhRKBaSPbM8FRfp2eL3aHz+ZG/p+8mgmsBKK33db9wOs53028/+HM0Wq9rnGHExpMwHU72842iSg0s8jSLcRu5SJM4J+uBEbltx3h7ej76zKms9yYVxlCSkO7T2KpM2CWIPLs1OOmu+aErtanQZCk1rpzR6JR+QQRL01TGDlv24ermeoPzOS8pF7SybjGpIvbxx+eZ/Z8eMDDEYET6aQllpLoDvgip+zA+ppKQBpdnVHJaQ+oSAJfHwVt9liUrbYbCr2nSo5nHgrs6SKC+m7VgyWVOWw4/dSutpcGnGC3excwD6A23Qoc5t84oQVFz4dZ4oZ+zblfxQcx6PW1Ue+IvYKIT/AjN9bkst67Krw3Y2LP7o/p99MACzTDIlV1LKonRMeG1aZjJAIaPDAxV/MRzDkmmnzoKoCvHCsSgpKduLQ+2dWXwWk8PiqBgAlc1V8faJQ0Or6X+yyY28RJ2eaTk/WQzskiCTwo2RBnEO9FTfSRQid24fZEiUW0ptIYqerJJPvV+IHpyNs2bLECBE8hmvcv1akIGTeDqmjBB/zPccDIXPcXn3//hlpM1TCiHSJOHwg5CIiAJ3flxjVhcSfPdMUn+cqZezA55AM3HI9GMO5kpga1KhIffSmAWAUKY+/NOK1pnOrWp99Ia4+bHpPhyEAA2kMGx5RjnaifoMYcKU0c2FPbDR98rtBWRKTQS51qxRmeJLsQswukzPQC9ZmY4kfxif+JrG5FxAGhZnH6pqdthIrF1qDPmv2fXV6Fa2I9vTtzmqrVMN6IhJ3JLGvK1r+Lq+OehNdeXeNoBLGOdQlCVVWzbYBLgslD70hzIOKnWkCxbgQFD4A8CXZuiOTx9UiIg30CSv0KEbALRVTudOq7T27IuhqhxNg1cbQVMjIvYSa8L8B0/N8NQu9zKAu4qyJg/D7RNg00Y5rJgGqxSIQyYWY/4xI5OCjO9dRKAIUodAE651VBYkFjSYHqjhYFax06eS4BqxYwC+eae+rI8elBnY01aP19ubZebcUgQG9nrpuFFrjMinmhMLVFBUVdX3j+4HhlfhyuYwnQlgxGwyY1FL28GmpL61h/pzsJCW0dAEm8L4PqyhRdb3Mes6IQzZaUVIortL6HXdFT0mPrw84TWPe7v40qQ0GM/8w7SHwP2kgk5EBDFGCPOD2FyviDzUXZubdbd/lY5wuQnSjg5d3qAZm7903V+Ptw7mr2LaS0U81j7jccvFmloZHHxTsDMeW16KEt5CmSG/XaiuF4WF722YCkjROxX/yDIf70UnZG8ygHn+Y5Yk/LnXVtaK6m9X7T1oJ+/ssg9yJmNzXbypJG0cKeFwMN4cuTcGamuXwD73BrwNzhznRNHTI9Ya8xPhZ2xG8Uo/epwlMqvzMsHnUE7pozFdNlmO+Zr3wUTvPXKP6KXWovh6Ney2yPOMarPamzkziTTQbwg+EdX1ekAat2f1MM3BXUPOq0OnEPV1/pyoLczO2tnHlvR0AMoFwfv4UdX1NRI7c4xMwqjAIXG1FpY9UujAuaxxphwZImy1Cv+EESO8R/hWdeiK/eWD1VyyR6inZjvp0xGy87NwDylIghH9T9K8fbAt/EIq+h1+z7tAPDzJd0dkH9N4G+HqkQB35Yas67sVhWje3qQDKlC32Hy1sYUvE/d5iCg4pFfw8ZI6b/la1b7HjTabmMb6Zj9n/Z8/NMTszX7JjdsSuDZCZgxlJq4KtGVuaRCwrM3FYdoB7lnmzvcn/NoByFMvLNqsJ1MAozZLc/JL3jXxpPrddUAeu0l0yJBOZv6If92LHNIF9QmgwKSxEktEb94hJOb3zoOgsVSd2pWho6EFakb8RdjvFqczo3tKS+lMkHBshFrMjDyvcjqza1WxWXeFhuSezA6OsHEKB/W/tX72s92Ns09xT3/08MEwzZhHxQzeadjq1twzXSEEYvkxOIraxJwLOT6oHO3f/g8R3RA7Zlc2hJ39z1+EQJMtil/TCxM+6oHKRMefZBxoSshwJ5qFowFLDgT8Xx8sfNZMHweEvYyzGmgUGAFX4dkmulr4X9dWYS6f84UO3Eh79emTSW+e54wOIak/uXIeFZLat8Mt5c8JgmCDlxNmz3E5rLNqvxqfgfMMmbGY8BtlJpA/g8QdPqd/a6rm327Q9CviV3u7q9TuDbdLkq0WA5bmbc5x+iiM5oWvtFxBzszpIEj8+IFyQ1PL3W+wnpMoL+oVYEVB2fD+PCM8o0mPebdgnKOoetuGbJs7v2zjBiwH/Bhcv/Aghriw01x+3UcBISE3fmlH/IBur8dguU5U6a64VAVPT6a1YK11rY5KLwSRhZPbdSnaWmnElNuGag7wAyQmA4blXMZEHBVMuHWbnvDc9PziTky+mQsehRslLD2loppw8r3OtgwpBwg+C5ANcR6/LmuLO8RdZuv5X2KigVPBD222tpMoLwLk0BG9XhoHHz1glcKkK4Pib0oCKhsz5HyeW20PefHWZbLwvcBseu+cRMRHCShIhME4av8mVRcFDqdi0w76oPGf8P7vhjAqHbN4H9tUzAnszLenm665OR+rU793AO77rTOoa8C5t+34oejF4P3hND8bgqkvzXhGrQUe69H0hBgznaYcdcmGHdyiRPyiMs22EA5h6to/eoOxyXxV/RzAe1BLbvhZsJWb06IDniqo8hlSX7w8Uv6MLQm/sKVyz6hj2FlnBtJC2YyKm8H+3ZE6yceZQsBEVxr67O31svO0QLwejD8xtW91TGjhXViFj1Hf5crPeiZ2Qb37ai4Q7GVIgo9uH7ouoP5p35cUtVPC/C/vsSjFnI44vIwiM+nnp2EWbZ7FmGXBhWzw1cM6bcBl3zLmWDImeR6WFFbleaNGnJIvP25ypouaJJ/f0bf791c5f/NWEDhNVmRLB20qPQhXY30jpq8bJMBkPwnSyhmNdNs3SRTHEWMRIJCAZY9ttFd06iiI8OMWqs4jDpPUn+JcNd45GoxxJa6UATSVEzj+FUNz8+mru77+hId4jZB/ao5SofwVyFnGknDYehPQDh60J0oAqq6+hKQ7OUQ5seET1k1QG0h+L7+/v8oIlPjFO1THqpjc2cqg9pcxZwZU62AK4kIbguTS/tkdGo5loFhTfIOYiopRyBbwMnQoOS9+fCIa0t5xNgG/GA99qppNt7MBIUCgSTThmSeHBlsldB6Y2JSPARtolNCElxCK/FKI45l0ABtfZkegTkRe22De2BoPucs5qs9/Z8qnMPP/Jr+agZFxsi62pe6/87hOZFOyaOY6e/7CIkKuo8zLbgGf9ZnvUzKQ2RS3KcHbqmBbdaWOlTu271Od6mKj6EH3qsE3Lv/b+sdLfFhlXmVjh4iaAJNW+V1KsBt2Vq1aD1+v4zChAfCFHoWFO7Vwm9CCRMcMEAZTSXk6xJuLfemg/sh48naJYccFlWhFYwMOYekmQwPMgYNDGf9bi0hrCirfr6mL0buaBuCJG0PjafVaPWNxKDsoG3S4Q4fpaqvdQEugmrCSu6xD83NB0sfBefFOarQFPHUzRcjZ1flnEUvBeShrIcjxwPkEe2XK4U6pCpfSap/yQLk2hvhtE+29Kq0lQlpquRHxf/K8FfF0dPhsFpSMXezYnsJjU2Jft2+46b+KI5E/T1kQEmnuVG3Z/2gfVKTJMLyAJXGb/lIn2UVpY3eBCOm1iP4SGX7BSmLKtMMQdE6ZpMS0QER7ryRa2GiNsTRtswGps06M6r1ErZbEASdF+o44f2BHl0/PbDlMnC2bUAjyiSHqXNxuYbhyvTCTCLje+0Iiwm7GfjFP3tYwi8IJq2qKpkq3PqY2UFBCLdaGA95oAy7GKJLovV8X2ECFPTvaDqVzsIBl14Dt0oOJA9C+dLNtwy/KRopKR/Irt4QisTJt3wTm2wI+9tArlYMq5HBqZpSZQFqxuIWx8yNkQ9DBJqNEUMPri0I4JsUISv68zfUfPtHUmpg7KO2ofSMepQLvLvNz58lTorKSG/2AYV3emcLmVVPNUWKDe8TSx9xl7jt68ZeW9Fz3vovSSuLYXjpMwxE1INWKj9kSrKAoI2juY0CsLJzNwn2ugCEvIw/6iSK08hEKkxnX8lTr5qmwGonqlP0QrqvcsD/WZfo+ceWJORzDylYKrXXYlyIetI1PnH5Cri6I+WKr7IpHDMb4A/jnzIzSXzsH1+nydsM1mgfMnR/xEwV9BrxVn4VuZuF0tis0094EEzKA+qIm74ycez4y/peUVM5xfJbdeREsDTYBhk9PAbu/uYDG0V8ftFQotqdN8X5A3SZWOMH7r/ZdtOHr8EnLxqKVlgikdLgGBQL6yFBS6jYGD6o+xCNVvxL7pd8GbOG4n/zoQ1xtEslv6J9FmcRKk7lq/zJV7h3D3Om3EpWDUggCeLpA3puH4QKekrYyrHmTOkw7DS016Qf55kuQxFsAvJNIVvZGT4mSe0olh6ym4AX8KO49MYah0fQs8iOZTAZ97fLuTpur4oolQWWazwA+lu57yiK3dj7yu+Xg0Y5+Kk/l9+MsiNP55uavd6OgbZdnl0oiLvobelWmXvLtj/H3p9PlYVA+dmlnp0//5Qt0f43xQQmvs7frGhT5EQCJzlnjua1FdgjgnvQDhKTgqVK4omqX4kzrE6byJRZytlSAT5yPUsitvkoul2PUZlR7s0pOOLA+y98XT7QZwK0fNkVfoR7otpGYwN17p7Hq5PzIf++qtKjoUj3Nh+e5nikHR7DvYLpp7IBUzRqKP8FrdgBRkdBMI0v1zlNpkZoN7AleN55rgtVqzCSLZvFTgHPP+QZEcPl5DaD9NA+ASF/5ReZwkT8+3SKHuu+3BgWoBS04iA56gdGWte4s4qezQK5cwnHzv1wScR/zz+Z4ashGdpHIu1faV7Z1rNjLzBDT4tUcF+MT+Dx9qrocp1wnYo+ShP95bQenfKUwd8zmcbo+m+vwwEPkmoGCYr4x03kUXyhVcAsF5Zkl8em+yPcnMcy21ZS/2vaW7KgY5C/rzCS9FjTpr5Z9yTkNmm4kbOqJFa6MBjqF8AAvsFAAAA",
    allowedPackages: ["Standard", "Premium"],
  },
  {
    title: "Body Fat Calculator",
    description: "Estimate your body fat percentage.",
    link: "/clients/tools/bodyfat",
    image:
      "https://images.unsplash.com/photo-1634463278803-f9f71890e67d?w=600&auto=format&fit=crop&q=60",
    allowedPackages: ["Premium"],
  },
  {
    title: "Protein Intake Calculator",
    description: "Find out your daily protein needs.",
    link: "/clients/tools/protein",
    image:
      "https://images.unsplash.com/photo-1693996045899-7cf0ac0229c7?w=600&auto=format&fit=crop&q=60",
    allowedPackages: ["Premium"],
  },
]

type Props = { userPackageName: string }

const ToolsSlider = ({ userPackageName }: Props) => {
  const [current, setCurrent] = useState(0)
  const itemsPerPage = 4
  const availableTools = tools.filter(tool =>
    tool.allowedPackages.includes(userPackageName)
  )
  const totalSlides = Math.ceil(availableTools.length / itemsPerPage)

  const nextSlide = () => {
    if (current < (totalSlides - 1) * itemsPerPage)
      setCurrent(current + itemsPerPage)
  }

  const prevSlide = () => {
    if (current > 0) setCurrent(current - itemsPerPage)
  }

  return (
    <div className='px-5 md:px-24 py-10 relative'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl font-bold text-white mb-2'>
          Our Fitness <span className='text-red-500'>Tools</span>
        </h2>
        <div className='flex gap-2'>
          <button
            onClick={prevSlide}
            disabled={current === 0}
            className={`p-2 rounded-md ${
              current === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-black/50 text-white hover:bg-red-500 transition"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={current + itemsPerPage >= availableTools.length}
            className={`p-2 rounded-md ${
              current + itemsPerPage >= availableTools.length
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-black/50 text-white hover:bg-red-500 transition"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {availableTools
          .slice(current, current + itemsPerPage)
          .map((tool, idx) => (
            <div
              key={idx}
              className='group relative bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden flex flex-col'
            >
              <div className='w-full h-48 relative overflow-hidden'>
                <Image
                  unoptimized
                  width={48}
                  height={48}
                  src={tool.image}
                  alt={tool.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
              </div>
              <div className='p-3 flex-1 flex flex-col justify-between'>
                <h2 className='text-xl font-semibold text-white'>
                  {tool.title}
                </h2>
                <Link
                  href={tool.link}
                  className='px-0 py-2 text-red-800 hover:text-red-500 transition-all duration-300'
                >
                  View More <span className='text-1xl text-red-600'>→</span>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ToolsSlider
