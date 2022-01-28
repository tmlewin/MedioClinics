using System.Collections.Generic;
using System.Linq;
using System.Text;
using System;



 
// create a function taht can search and replace a word in a string and return the new string with the replaced word


namespace CSharpAlgo.Excercise.Excercise1
{
    public class ReplaceWord
    {
        public static string Replace(string str, string oldWord, string newWord)
        {
            string[] words = str.Split(' ');
            StringBuilder sb = new StringBuilder();
            foreach (string word in words)
            {
                if (word == oldWord)
                {
                    sb.Append(newWord);
                    sb.Append(" ");
                }
                else
                {
                    sb.Append(word);
                    sb.Append(" ");
                }
            }
            return sb.ToString().Trim();
        }

        public static void Test()
        {
            string str = "This is a test string";
            string oldWord = "test";
            string newWord = "testing";
            Console.WriteLine(Replace(str, oldWord, newWord));
        }
        

    }
}










// Output:
//CSharpAlgo.Excercise.Excercise1.ReplaceWord.Replace(str, oldWord, newWord)


// Expected Output:
//CSharpAlgo.Excercise.Excercise1.ReplaceWord.Replace(str, oldWord, newWord)




















// Program.cs
// Language: csharp


