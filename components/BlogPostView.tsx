// components/BlogPostView.tsx  (Client Component — unchanged structure, image/mobile optimizations kept) 
 "use client"; 
 import { motion } from "framer-motion"; 
 import { useRef } from "react"; 
 import Image from "next/image"; 
 import Link from "next/link"; 
 import { FaArrowRight } from "react-icons/fa"; 

 interface ContentBlock { 
   type: "paragraph" | "heading" | "list" | "image"; 
   content?: string; 
   items?: string[]; 
   src?: string; 
   alt?: string; 
 } 

 interface BlogPost { 
   slug: string; 
   title: string; 
   subheadline: string; 
   heroImage: string; 
   metaDescription: string; 
   content: ContentBlock[]; 
   finalCtaText: string; 
   finalCtaLink: string; 
 } 

 function renderContent(content: ContentBlock[]) { 
   return content.map((block, index) => { 
     switch (block.type) { 
       case "heading": 
         return ( 
           <h2 
             key={index} 
             className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold mt-8 mb-4 text-stark-white" 
             dangerouslySetInnerHTML={{ __html: block.content || "" }} 
           /> 
         ); 
       case "paragraph": 
         return ( 
           <p 
             key={index} 
             className="font-inter text-base sm:text-lg leading-7 sm:leading-8 text-stark-white/80 mt-4" 
           	dangerouslySetInnerHTML={{ __html: block.content || "" }} 
           /> 
         ); 
       case "list": 
         return ( 
           <ul 
             key={index} 
           	className="space-y-4 font-inter text-base sm:text-lg leading-7 sm:leading-8 text-stark-white/80 mt-6" 
           > 
             {block.items?.map((item, i) => ( 
               <li key={i} dangerouslySetInnerHTML={{ __html: item }} /> 
             ))} 
           </ul> 
         ); 
       case "image": 
         return ( 
           <div 
             key={index} 
           	className="my-8 sm:my-10 relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl-strong" 
           > 
             <Image 
               src={block.src || ""} 
               alt={block.alt || "Blog post image"} 
               fill 
               sizes="(max-width: 768px) 100vw, 50vw" 
               style={{ objectFit: "cover", objectPosition: "center" }} 
             /> 
           </div> 
         ); 
       default: 
         return null; 
   	} 
   }); 
 } 

 export default function BlogPostView({ post }: { post: BlogPost }) { 
   const heroRef = useRef(null); 

   return ( 
   	<main className="bg-imperial-void text-stark-white min-h-screen"> 
   	  <motion.section 
   		initial={{ opacity: 0 }} 
   		animate={{ opacity: 1 }} 
   		transition={{ duration: 0.8 }} 
   		className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden" 
   	  > 
   		<Image 
   		  src={post.heroImage} 
   		  alt={post.title} 
   		  fill 
   		  priority 
   		  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" 
   		  style={{ objectFit: "cover", objectPosition: "center" }} 
   		/> 
   		<div className="absolute inset-0 bg-imperial-void bg-opacity-70 flex items-center justify-center text-center px-4 sm:px-6"> 
   		  <h1 
   			className="font-playfair text-stark-white text-[32px] sm:text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-tight sm:leading-snug max-w-4xl" 
   			dangerouslySetInnerHTML={{ __html: post.title }} 
   		  /> 
   		</div> 
   	  </motion.section> 
   	  <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-4xl -mt-16 sm:-mt-20 relative z-10"> 
   		<div className="prose prose-invert prose-lg mx-auto"> 
   		  {renderContent(post.content)} 
   		  <div className="mt-10 sm:mt-12"> 
   			<Link href={post.finalCtaLink}> 
   			  <motion.button 
   				whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }} 
   				className="bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer flex items-center justify-center w-full sm:w-auto" 
   			  > 
   				{post.finalCtaText} <FaArrowRight className="ml-2" /> 
   			  </motion.button> 
   			</Link> 
   		  </div> 
   		</div> 
   	  </section> 
   	</main> 
   ); 
 }