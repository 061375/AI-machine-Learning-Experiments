class UserErrors():
    def __init__(self):
        self.errors = []
    
    def setError(self, error):
        self.errors.append(error)
    
    def getErrors(self):
        return self.errors
    
    def clearErrors(self):
        self.errors = []

# Instantiate UserErrors
userErrors = UserErrors()
