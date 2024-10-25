"use client"

import { useState } from "react"
import { Menu, User, LogOut, PlusCircle, Search, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export function TriviaAppV1Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [remainingQuestions, setRemainingQuestions] = useState(10)
  const [showUserInfo, setShowUserInfo] = useState(false)

  const handleSkip = () => {
    setCurrentQuestion(currentQuestion + 1)
    setRemainingQuestions(remainingQuestions - 1)
  }

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1)
    setRemainingQuestions(remainingQuestions - 1)
    setScore(score + 1)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 text-white p-4 md:p-8">
    {/* Left Sidebar - Hamburger Menu */}
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="fixed top-4 left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] bg-blue-900/95 border-r-0">
        <SheetHeader>
          <SheetTitle className="text-white">Menu</SheetTitle>
          <SheetDescription className="text-blue-200">
            Quick access to your trivia stats
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          <Button variant="ghost" className="justify-start text-white hover:bg-white/10">
            <User className="mr-2 h-4 w-4" /> Profile
          </Button>
          <Button variant="ghost" className="justify-start text-white hover:bg-white/10">
            <PlusCircle className="mr-2 h-4 w-4" /> Quizzes Created
            <Badge variant="secondary" className="ml-auto">5</Badge>
          </Button>
          <Button variant="ghost" className="justify-start text-white hover:bg-white/10">
            <Search className="mr-2 h-4 w-4" /> Solved Quizzes
            <Badge variant="secondary" className="ml-auto">20</Badge>
          </Button>
          <Button variant="outline" className="mt-4 text-black border-white/20 hover:bg-white/10">
            New Quiz
          </Button>
          <Button variant="outline" className="text-black border-white/20 hover:bg-white/10">
            Browse
          </Button>
          <SheetClose asChild>
            <Button variant="destructive" onClick={handleLogout} className="mt-4">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>

    {/* Main Content */}
    <main className="flex flex-col items-center justify-center min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Question {currentQuestion}</h2>
              <p className="text-lg mb-6">What is the capital of France?</p>
              <div className="grid grid-cols-1 gap-4">
                {["London", "Berlin", "Madrid", "Paris"].map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-black border-white/20 hover:bg-white/10 transition-colors duration-200"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-6">
              <Button variant="ghost" onClick={handleSkip} className="text-white hover:bg-white/10">
                Skip
              </Button>
              <Button onClick={handleNextQuestion} className="bg-teal-500 hover:bg-teal-600 text-white">
                Next Question
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </main>

    {/* Right Floating User Info Box */}
    <div className="fixed top-4 right-4">
      <Button
        variant="ghost"
        className="text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
        onClick={() => setShowUserInfo(!showUserInfo)}
      >
        <User className="h-6 w-6" />
      </Button>
      <AnimatePresence>
        {showUserInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg w-48"
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-white hover:bg-white/10 p-1"
              onClick={() => setShowUserInfo(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <p className="font-semibold mb-2">{isLoggedIn ? "Username" : "Guest"}</p>
            <p className="text-sm mb-1">Previous Score: {score}</p>
            <p className="text-sm">Remaining: {remainingQuestions}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    {/* Simple Footer */}
    <footer className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md p-4 text-center text-white">
      <p className="text-sm">&copy; 2023 Trivia App. All rights reserved.</p>
    </footer>
  </div>
  )
}