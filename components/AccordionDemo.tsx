import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <div className='mt-10'>
      <div className='text-center mb-6'>
        <h1 className='text-2xl text-white font-bold'>FQR</h1>
      </div>
      <Accordion
        type='single'
        collapsible
        className='md:w-full max-w-5xl mx-auto'
        defaultValue='item-1'
      >
        <AccordionItem value='item-1' className='mb-3'>
          <AccordionTrigger className='bg-black text-white font-bold py-4 px-6 rounded-t-none rounded-b-none border-2 border-red-600 hover:border-orange-500 transition-all duration-300'>
            How do I get started with a workout plan on FitMaker?{" "}
          </AccordionTrigger>
          <AccordionContent className='bg-black text-white flex flex-col gap-4 p-6 border-l-2 border-r-2 border-b-2 border-red-600  -mt-2'>
            <p>
              Our flagship product combines cutting-edge technology with sleek
              design. Built with premium materials, it offers unparalleled
              performance and reliability.
            </p>
            <p>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2' className='mb-3'>
          <AccordionTrigger className='bg-black text-white font-bold py-4 px-6 rounded-t-none rounded-b-none border-2 border-red-600 hover:border-orange-500 transition-all duration-300'>
            What is FitMaker and how can it help me reach my fitness goals?{" "}
          </AccordionTrigger>
          <AccordionContent className='bg-black text-white flex flex-col gap-4 p-6 border-l-2 border-r-2 border-b-2 border-red-600  -mt-2'>
            <p>
              FitMaker is an online fitness platform that offers personalized
              workout plans, expert coaching, and comprehensive nutritional
              guidance. Whether you're looking to lose weight, build muscle, or
              simply stay fit, our tailored programs and community support will
              help you achieve your fitness goals.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3' className='mb-3'>
          <AccordionTrigger className='bg-black text-white font-bold py-4 px-6 rounded-t-none rounded-b-none border-2 border-red-600 hover:border-orange-500 transition-all duration-300'>
            What is included in the Custom Plan?{" "}
          </AccordionTrigger>
          <AccordionContent className='bg-black text-white flex flex-col gap-4 p-6 border-l-2 border-r-2 border-b-2 border-red-600  -mt-2'>
            <p>
              Our flagship product combines cutting-edge technology with sleek
              design. Built with premium materials, it offers unparalleled
              performance and reliability.
            </p>
            <p>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4' className='mb-3'>
          <AccordionTrigger className='bg-black text-white font-bold py-4 px-6 rounded-t-none rounded-b-none border-2 border-red-600 hover:border-orange-500 transition-all duration-300'>
            Can I change my plan after signing up?{" "}
          </AccordionTrigger>
          <AccordionContent className='bg-black text-white flex flex-col gap-4 p-6 border-l-2 border-r-2 border-b-2 border-red-600  -mt-2'>
            <p>
              Our flagship product combines cutting-edge technology with sleek
              design. Built with premium materials, it offers unparalleled
              performance and reliability.
            </p>
            <p>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-5' className='mb-3'>
          <AccordionTrigger className='bg-black text-white font-bold py-4 px-6 rounded-t-none rounded-b-none border-2 border-red-600 hover:border-orange-500 transition-all duration-300'>
            What kind of support can I expect from my trainer?{" "}
          </AccordionTrigger>
          <AccordionContent className='bg-black text-white flex flex-col gap-4 p-6 border-l-2 border-r-2 border-b-2 border-red-600  -mt-2'>
            <p>
              Our flagship product combines cutting-edge technology with sleek
              design. Built with premium materials, it offers unparalleled
              performance and reliability.
            </p>
            <p>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
