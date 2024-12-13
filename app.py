from flask import Flask, render_template, request, flash,redirect,url_for
from datetime import datetime, time
import csv
import os


# Create an instance of the Flask class
app = Flask(__name__)

app.secret_key = 'supersecretkey'

contacts = []

# Define a route
@app.route('/')
def home():
    return render_template("index.html")

@app.route('/About')
def about():
    return render_template("about.html")

@app.route('/Service')
def service():
    return render_template("service.html")

@app.route('/Blog')
def blog():
    return render_template("blog.html")

@app.route('/Contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        phone_number = request.form.get('phone')
        email_id = request.form.get('email')
        
        # Store contact info in memory
        contact_info = {
            'name': name,
            'phone': phone_number,
            'email': email_id,
            'date': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        contacts.append(contact_info)

        flash("Our Team will Contact you", "success")
        return redirect(url_for('contact'))
    
    return render_template('contact.html')

@app.route('/showContact')
def showContact():
    return render_template('show_contacts.html', contacts=contacts)
    

@app.route('/MetroMap')
def metro_map():
    return render_template('Metro_Map.html')

@app.route('/BlueMap')
def blue_map():
    return render_template('Blue_Line_Map.html')

@app.route('/GreenMap')
def green_map():
    return render_template('Green_Line_Map.html') 

@app.route('/Live_Train_Tracker', methods=['GET', 'POST'])
def live_train_tracker():
    if request.method == 'POST':
        user_input_a = request.form.get('time')  # Get time input from form
        
        try:
            # Convert user input to time object
            a = datetime.strptime(user_input_a, "%H:%M").time()
        except ValueError:
            flash('Invalid time format! Please enter time in HH:MM format.', 'error')
            return render_template('Live_Train_Tracker.html')
        
        # Predefined times
        time_list = [
            (time(4, 56), "4:56 AM"),
            (time(5, 3), "5:03 AM"),
            (time(5, 10), "5:10 AM"),
            (time(5, 17), "5:17 AM"),
            (time(5, 24), "5:24 AM"),
            (time(5, 31), "5:31 AM"),
            (time(5, 38), "5:38 AM"),
            (time(5, 45), "5:45 AM"),
            (time(5, 52), "5:52 AM"),
            (time(5, 59), "5:59 AM"),
            (time(6, 6), "6:06 AM"),
            (time(6, 13), "6:13 AM"),
            (time(6, 20), "6:20 AM"),
            (time(6, 27), "6:27 AM"),
            (time(6, 34), "6:34 AM"),
            (time(6, 41), "6:41 AM"),
            (time(6, 48), "6:48 AM"),
            (time(6, 55), "6:55 AM"),
            (time(7, 2), "7:02 AM"),
            (time(7, 9), "7:09 AM"),
            (time(7, 16), "7:16 AM"),
            (time(7, 23), "7:23 AM"),
            (time(7, 30), "7:30 AM"),
            (time(7, 37), "7:37 AM"),
            (time(7, 44), "7:44 AM"),
            (time(7, 51), "7:51 AM"),
            (time(7, 58), "7:58 AM"),
            (time(8, 4), "8:04 AM"),
            (time(8, 10), "8:10 AM"),
            (time(8, 16), "8:16 AM"),
            (time(8, 22), "8:22 AM"),
            (time(8, 28), "8:28 AM"),
            (time(8, 34), "8:34 AM"),
            (time(8, 40), "8:40 AM"),
            (time(8, 46), "8:46 AM"),
            (time(8, 52), "8:52 AM"),
            (time(8, 58), "8:58 AM"),
            (time(9, 4), "9:04 AM"),
            (time(9, 10), "9:10 AM"),
            (time(9, 16), "9:16 AM"),
            (time(9, 22), "9:22 AM"),
            (time(9, 28), "9:28 AM"),
            (time(9, 34), "9:34 AM"),
            (time(9, 40), "9:40 AM"),
            (time(9, 46), "9:46 AM"),
            (time(9, 52), "9:52 AM"),
            (time(9, 58), "9:58 AM"),
            (time(10, 4), "10:04 AM"),
            (time(10, 10), "10:10 AM"),
            (time(10, 16), "10:16 AM"),
            (time(10, 22), "10:22 AM"),
            (time(10, 28), "10:28 AM"),
            (time(10, 34), "10:34 AM"),
            (time(10, 40), "10:40 AM"),
            (time(10, 46), "10:46 AM"),
            (time(10, 52), "10:52 AM"),
            (time(10, 58), "10:58 AM"),
            (time(11, 5), "11:05 AM"),
            (time(11, 12), "11:12 AM"),
            (time(11, 19), "11:19 AM"),
            (time(11, 26), "11:26 AM"),
            (time(11, 33), "11:33 AM"),
            (time(11, 40), "11:40 AM"),
            (time(11, 47), "11:47 AM"),
            (time(11, 54), "11:54 AM"),
            (time(12, 1), "12:01 PM"),
            (time(12, 8), "12:08 PM"),
            (time(12, 15), "12:15 PM"),
            (time(12, 22), "12:22 PM"),
            (time(12, 29), "12:29 PM"),
            (time(12, 36), "12:36 PM"),
            (time(12, 43), "12:43 PM"),
            (time(12, 50), "12:50 PM"),
            (time(12, 57), "12:57 PM"),
            (time(13, 4), "1:04 PM"),
            (time(13, 11), "1:11 PM"),
            (time(13, 18), "1:18 PM"),
            (time(13, 25), "1:25 PM"),
            (time(13, 32), "1:32 PM"),
            (time(13, 39), "1:39 PM"),
            (time(13, 46), "1:46 PM"),
            (time(13, 53), "1:53 PM"),
            (time(14, 0), "2:00 PM"),
            (time(14, 7), "2:07 PM"),
            (time(14, 14), "2:14 PM"),
            (time(14, 21), "2:21 PM"),
            (time(14, 28), "2:28 PM"),
            (time(14, 35), "2:35 PM"),
            (time(14, 42), "2:42 PM"),
            (time(14, 49), "2:49 PM"),
            (time(14, 56), "2:56 PM"),
            (time(15, 3), "3:03 PM"),
            (time(15, 10), "3:10 PM"),
            (time(15, 17), "3:17 PM"),
            (time(15, 24), "3:24 PM"),
            (time(15, 31), "3:31 PM"),
            (time(15, 38), "3:38 PM"),
            (time(15, 45), "3:45 PM"),
            (time(15, 52), "3:52 PM"),
            (time(15, 59), "3:59 PM"),
            (time(16, 6), "4:06 PM"),
            (time(16, 13), "4:13 PM"),
            (time(16, 20), "4:20 PM"),
            (time(16, 27), "4:27 PM"),
            (time(16, 34), "4:34 PM"),
            (time(16, 41), "4:41 PM"),
            (time(16, 48), "4:48 PM"),
            (time(16, 55), "4:55 PM"),
            (time(17, 1), "5:01 PM"),
            (time(17, 7), "5:07 PM"),
            (time(17, 13), "5:13 PM"),
            (time(17, 19), "5:19 PM"),
            (time(17, 25), "5:25 PM"),
            (time(17, 31), "5:31 PM"),
            (time(17, 37), "5:37 PM"),
            (time(17, 43), "5:43 PM"),
            (time(17, 49), "5:49 PM"),
            (time(17, 55), "5:55 PM"),
            (time(18, 1), "6:01 PM"),
            (time(18, 7), "6:07 PM"),
            (time(18, 13), "6:13 PM"),
            (time(18, 19), "6:19 PM"),
            (time(18, 25), "6:25 PM"),
            (time(18, 31), "6:31 PM"),
            (time(18, 37), "6:37 PM"),
            (time(18, 43), "6:43 PM"),
            (time(18, 49), "6:49 PM"),
            (time(18, 55), "6:55 PM"),
            (time(19, 1), "7:01 PM"),
            (time(19, 7), "7:07 PM"),
            (time(19, 13), "7:13 PM"),
            (time(19, 19), "7:19 PM"),
            (time(19, 25), "7:25 PM"),
            (time(19, 31), "7:31 PM"),
            (time(19, 37), "7:37 PM"),
            (time(19, 43), "7:43 PM"),
            (time(19, 49), "7:49 PM"),
            (time(19, 55), "7:55 PM"),
            (time(20, 0), "8:00 PM"),
            (time(20, 7), "8:07 PM"),
            (time(20, 14), "8:14 PM"),
            (time(20, 21), "8:21 PM"),
            (time(20, 28), "8:28 PM"),
            (time(20, 35), "8:35 PM"),
            (time(20, 42), "8:42 PM"),
            (time(20, 49), "8:49 PM"),
            (time(20, 56), "8:56 PM"),
            (time(21, 3), "9:03 PM"),
            (time(21, 10), "9:10 PM"),
            (time(21, 17), "9:17 PM"),
            (time(21, 24), "9:24 PM"),
            (time(21, 31), "9:31 PM"),
            (time(21, 38), "9:38 PM"),
            (time(21, 45), "9:45 PM"),
            (time(21, 52), "9:52 PM"),
            (time(21, 59), "9:59 PM"),
            (time(22, 0), "10:00 PM"),
            (time(22, 15), "10:15 PM"),
            (time(22, 30), "10:30 PM"),
            (time(22, 45), "10:45 PM"),
            (time(23, 0), "11:00 PM")
        ]
        
        # Check where the user input fits
        for train_time, display_time in time_list:
            if a <= train_time:
                flash(f'The Train Will arrive at {display_time}', 'success')
                break
        else:
            flash("Metro is Official Closed Open on 04:56 AM.", 'error')
        
    return render_template('Live_Train_Tracker.html')

@app.route('/openNav')
def opennav():
    return render_template('openNav.html')

@app.route('/farecalculator', methods=['GET', 'POST'])
def Fare_Calculator():
    if request.method == 'POST':
        from_station = request.form.get('from_station')
        to_station = request.form.get('to_station')
        fare_found = False

        # Construct the file path
        csv_file_path = os.path.join(app.static_folder, 'csv', 'fare.csv')

        print(f"Trying to open: {csv_file_path}")  # Debugging output

        if os.path.exists(csv_file_path):
            try:
                with open(csv_file_path, 'r') as file:
                    source = csv.reader(file)

                    for i in source:
                        if len(i) >= 3:
                            if i[0] == from_station and i[1] == to_station:
                                flash(f"Your fare price is: {i[2]} Rs")
                                fare_found = True
                                break

                if not fare_found:
                    flash("No fare found for the given route.")
            
            except Exception as e:
                flash(f"An error occurred: {str(e)}")
        else:
            flash("Error: Fare data file not found.")

    return render_template('Fare_calculator.html')


# Run the app
if __name__ == '__main__':
    app.run(debug=True)
 