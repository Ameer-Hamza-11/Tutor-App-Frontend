import React, { useMemo, useState } from 'react'
import { useTheme } from "../context/ThemeProvider";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "../apis/fetchApi";
import { Search, BookOpen, Layers } from "lucide-react";

const Courses = () => {
    const { theme } = useTheme();
    const isLight = theme === "light";
    const [search, setSearch] = useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["subjects"],
        queryFn: fetchSubjects,
    });

    const subjects = useMemo(() => {
        return Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
    }, [data]);

    const filteredSubjects = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return subjects;
        return subjects.filter((s) =>
            (s.Subject_Name || s.name || "").toLowerCase().includes(term)
        );
    }, [subjects, search]);

    if (isLoading) {
        return (
            <p className={`text-center animate-pulse ${isLight ? "text-orange-600" : "text-orange-400"}`}>
                Loading courses...
            </p>
        );
    }

    if (isError) {
        return (
            <p className="text-center text-red-500">Failed to load courses.</p>
        );
    }

    return (
        <div className={`space-y-6 transition-colors duration-300 ${isLight ? "text-gray-900" : "text-gray-100"}`}>
            {/* Header */}
            <div>
                <h1 className={`text-3xl font-bold ${isLight ? "text-black" : "text-white"}`}>Courses</h1>
                <p className={`${isLight ? "text-gray-600" : "text-gray-400"}`}>
                    Explore subjects and find the right course for you.
                </p>
            </div>

            {/* Search Bar */}
            <div className="w-full flex justify-center">
                <div className={`flex items-center rounded-xl px-4 py-2 w-full max-w-md border transition shadow-md ${
                    isLight ? "bg-white border-gray-300 focus-within:shadow-orange-200" : "bg-gray-800 border-gray-700 focus-within:shadow-orange-500/30"
                }`}>
                    <Search className={`mr-2 ${isLight ? "text-orange-600" : "text-orange-400"}`} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`bg-transparent outline-none w-full ${isLight ? "text-gray-800 placeholder-gray-500" : "text-white placeholder-gray-400"}`}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSubjects.map((subject, index) => {
                    const title = subject.Subject_Name || subject.name || "Untitled";
                    return (
                        <div
                            key={subject.Subject_Id || subject.id || `${title}-${index}`}
                            className={`rounded-xl p-4 border shadow-sm transition ${
                                isLight ? "bg-white border-gray-200 hover:shadow-md" : "bg-gray-800 border-gray-700 hover:border-orange-400/40"
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${isLight ? "bg-orange-100 text-orange-600" : "bg-orange-500/20 text-orange-300"}`}>
                                    <BookOpen size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-lg font-semibold ${isLight ? "text-gray-900" : "text-gray-100"}`}>{title}</h3>
                                    <p className={`text-sm mt-1 ${isLight ? "text-gray-600" : "text-gray-300"}`}>
                                        Learn {title} with curated lessons and expert tutors.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div className={`flex items-center gap-2 text-sm ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                                    <Layers size={16} />
                                    <span>Beginner • Intermediate</span>
                                </div>
                                <button
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                                        isLight ? "bg-orange-600 text-white hover:bg-orange-700" : "bg-orange-500 text-white hover:bg-orange-600"
                                    }`}
                                >
                                    Explore
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredSubjects.length === 0 && (
                <div className={`text-center py-16 rounded-xl border ${isLight ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"}`}>
                    <p className={`${isLight ? "text-gray-700" : "text-gray-300"}`}>No courses found. Try a different search.</p>
                </div>
            )}
        </div>
    )
}

export default Courses
