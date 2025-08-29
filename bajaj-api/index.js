const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid request body. 'data' must be an array."
            });
        }

        const user_id = "himansh_joshi_13082004";
        const email = "himanshjoshi4@gmail.com";
        const roll_number = "RA2011003010456";

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        data.forEach(item => {
            if (!isNaN(item) && item.trim() !== '') {
                const num = Number(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabet_string += item;
            } else {
                special_characters.push(item);
            }
        });

        const reversed_alphabets = alphabet_string.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }


        const response = {
            is_success: true,
            user_id,
            email,
            roll_number,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            is_success: false,
            error: "An internal server error occurred."
        });
    }
});

// Start the server only if the file is run directly (for local development)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;