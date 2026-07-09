"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceCardProps {
  logo: string;
  company: string;
  role: string;
  period: string;
  location: string;
  descriptions: string[];
  technologies: string[];
  defaultOpen?: boolean;
}

export function ExperienceCard({
  logo,
  company,
  role,
  period,
  location,
  descriptions,
  technologies,
  defaultOpen = false,
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2 border-t border-border p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer"
      >
        <div className="flex items-center gap-2 w-full">
          <Avatar className="size-12 rounded-lg ring-1 ring-gray-300 border-[3px] border-white flex-shrink-0">
            <AvatarImage src={logo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col min-w-0 flex-1 items-start">
            <p className="text-lg font-bold break-words">{company}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-col items-end gap-2">
              <p className="text-gray-800 text-sm font-medium whitespace-nowrap">{period}</p>
              <p className="text-gray-500 text-sm whitespace-nowrap">{location}</p>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="size-5 text-gray-500 flex-shrink-0" />
            </motion.div>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex flex-col gap-2">
                {descriptions.map((description, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="text-gray-700 text-sm"
                  >
                    {description}
                  </motion.p>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: descriptions.length * 0.05 }}
                className="flex gap-2 cursor-default flex-wrap"
              >
                {technologies.map((tech, index) => (
                  <p
                    key={index}
                    className="text-gray-800 p-1 border border-gray-300 rounded-md text-xs whitespace-nowrap"
                  >
                    {tech}
                  </p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
