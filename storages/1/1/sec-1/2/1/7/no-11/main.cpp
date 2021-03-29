// C++ program to find the sum of two
// numbers using function declared in
// header file
#include <iostream>


using namespace std;


// numbers passed
int sumOfTwoNumbers(int a, int b)
{
    return (a + b);
}
// Driver Code
int main()
{

    // Given two numbers
    int a, b;
    
    cin>>a>>b;
    // Function declared in header
    // file to find the sum
    cout << "Sum is"
         << sumOfTwoNumbers(a, b)
         << endl;
}