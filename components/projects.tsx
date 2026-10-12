"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowRight, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { projectList } from "@/lib/projects"
import { getService } from "@/lib/services"

export function Projects({
  showLink = true,
  limit,
}: {
  showLink?: boolean
  limit?: number
}) {
  const projects = limit ? projectList.slice(0, limit) : projectList

  return (
    <section id="projects" className="scroll-mt-24 py-20 lg:py-32 bg-[#0A0E1A]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge
                variant="outline"
                className="border-primary text-primary bg-primary/10 text-xs tracking-wider mb-4"
              >
                OUR WORK
              </Badge>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              RECENT PROJECTS
            </motion.h2>
          </div>
          {showLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center text-primary hover:text-[#1D4ED8] font-semibold mt-4 md:mt-0 transition-colors"
              >
                VIEW ALL PROJECTS
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              id={project.slug}
              className="scroll-mt-28"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/projects/${project.slug}`} className="block">
              <Card className="group relative overflow-hidden border-0 py-0 h-[380px] cursor-pointer">
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/50 to-transparent" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                    {getService(project.service)?.title}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">{project.vessel}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {project.location}
                    </span>
                    <span>{project.duration}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
