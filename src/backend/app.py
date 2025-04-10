#from werkzeug.exceptions import HTTPException
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from src.backend.utils import *

# Flask application configuration
app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST', 'OPTIONS'])
def empty():
    """
    Empty function which sends a json when we start the application.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    return jsonify({"status": 200, "data": {}, "message": "Backend working"})


@app.route('/addDoctor', methods=['POST', 'OPTIONS'])
def app_addDoctor():
    """
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Information about the Doctor getting added.
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'POST':
        data = json.loads(request.data)
        firstname = data['firstname']
        lastname = data['lastname']
        primaryspecialty = data['primaryspecialty']
        secondaryspecialty = data['secondaryspecialty']
        type = data['type']
        degree = data['degree']
        phone = data['phone']
        email = data['email']
        gender = data['gender']
        yoe = data['yoe']
        userid = data['userid']
        status, msg = addDoctor(firstname, lastname, primaryspecialty, secondaryspecialty,
                                type, degree, phone, email, gender, yoe, userid)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/updateDoctor', methods=['PUT', 'OPTIONS'])
def app_updateDoctor():
    """
    Updating doctor info already exisiting.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Updated doctor info 
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'PUT':
        data = json.loads(request.data)

        status, msg = updateDoctorInfo(data)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/getDoctorInfo', methods=['GET', 'OPTIONS'])
def app_getDoctorInfo():
    """
    Gets information of the doctor based on the id.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    id : int
        ID doctor id.
    Returns
    ----------
    json
        Returns a json containing the status, data which contains the information, message in accordance with the status.
    """

    if request.method == 'GET':

        id = request.args.get('id')
        status, data = getDoctorDetails(id)
        if status:
            if data == []:
                return jsonify({"status": 200, "data": {}, "message": "No records found"})
            else:
                return jsonify({"status": 200, "data": data, "message": "Records found"})
        else:
            return jsonify({"status": 400, "data": {}, "message": data})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/getDoctors', methods=['GET', 'OPTIONS'])
def app_getDoctors():
    """
    Gets information of all the active doctors\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------

    Returns
    ----------
    json
        Returns a json containing the status, data which contains the information, message in accordance with the status.
    """

    if request.method == 'GET':

        status, data = getDoctors()
        if status:
            if data == []:
                return jsonify({"status": 200, "data": {}, "message": "No records found"})
            else:
                return jsonify({"status": 200, "data": data, "message": "Records found"})
        else:
            return jsonify({"status": 400, "data": {}, "message": data})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/addHospital', methods=['POST', 'OPTIONS'])
def app_addHospital():
    """
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Information about the Hospital getting added.
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'POST':
        data = json.loads(request.data)
        name = data['name']
        type = data['type']
        addressline1 = data['addressline1']
        addressline2 = data['addressline2']
        city = data['city']
        state = data['state']
        country = data['country']
        zipcode = data['zipcode']
        phone = data['phone']
        email = data['email']

        status, msg = addHospital(name, type, addressline1, addressline2, city,
                                  state, country, zipcode, phone, email)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/updateHospital', methods=['PUT', 'OPTIONS'])
def app_updateHospital():
    """
    Updating Hospital info already exisiting.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Updated doctor info 
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'PUT':
        data = json.loads(request.data)

        status, msg = updateHospitalInfo(data)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/getHospitalInfo', methods=['GET', 'OPTIONS'])
def app_getHospitalInfo():
    """
    Gets information of the hospital based on the id.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    id : int
        ID hospital id.
    Returns
    ----------
    json
        Returns a json containing the status, data which contains the information, message in accordance with the status.
    """

    if request.method == 'GET':

        id = request.args.get('id')
        status, data = getHospitalDetails(id)
        if status:
            if data == []:
                return jsonify({"status": 200, "data": {}, "message": "No records found"})
            else:
                return jsonify({"status": 200, "data": data, "message": "Records found"})
        else:
            return jsonify({"status": 400, "data": {}, "message": data})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/getHospitals', methods=['GET', 'OPTIONS'])
def app_getHospitals():
    """
    Gets information of all the hospitals.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------

    Returns
    ----------
    json
        Returns a json containing the status, data which contains the information, message in accordance with the status.
    """

    if request.method == 'GET':

        status, data = getHospitals()
        if status:
            if data == []:
                return jsonify({"status": 200, "data": {}, "message": "No records found"})
            else:
                return jsonify({"status": 200, "data": data, "message": "Records found"})
        else:
            return jsonify({"status": 400, "data": {}, "message": data})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/addAffiliation', methods=['POST', 'OPTIONS'])
def app_addAffiliation():
    """
    Affiliation is created between an existing doctor and hospital\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.

    Parameters
    ----------
    data : json
        Information about the affiliation which is getting created.

    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'POST':
        data = json.loads(request.data)
        doctorid = data['doctorid']
        hospitalid = data['hospitalid']
        appointmentschedule = data['appointmentschedule']
        status, msg = addAffiliation(doctorid, hospitalid, appointmentschedule)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/addAppointment', methods=['POST', 'OPTIONS'])
def app_addAppointment():
    """
    Appoitnment is created for a user with a doctor in a hospital on a particular date and timeslot\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.

    Parameters
    ----------
    data : json
        Information about the appointment which is getting created.

    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'POST':
        data = json.loads(request.data)
        userid = data['userid']
        doctorid = data['doctorid']
        hospitalid = data['hospitalid']
        date = data['date']
        timeslot = data['timeslot']
        status, msg = addAppointment(
            userid, doctorid, hospitalid, date, timeslot)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/updateAppointment', methods=['PUT', 'OPTIONS'])
def app_updateAppointment():
    """
    Updating Appointment info already exisiting.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Updated appointment info 
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'PUT':
        data = json.loads(request.data)

        status, msg = updateAppointmentInfo(data)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/updateAffiliation', methods=['PUT', 'OPTIONS'])
def app_updateAffiliation():
    """
    Updating an affiliation already exisiting.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.

    Parameters
    ----------
    data : json
        Updated appointment schedule or isactive status

    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'PUT':
        data = json.loads(request.data)

        status, msg = updateAffiliation(data)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/getAfiiliationByDoctor', methods=['GET', 'OPTIONS'])
def app_getAfiiliationByDoctor():
    """
    Gets information for all the hospitals affiliated to a doctor.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.

    Parameters
    ----------
    id : int
        ID doctor id.

    Returns
    ----------
    json
        Returns a json containing the status, data which contains the information, message in accordance with the status.
    """

    if request.method == 'GET':

        id = request.args.get('id')
        status, data = getAfiiliationByDoctor(id)
        if status:
            if data == []:
                return jsonify({"status": 200, "data": {}, "message": "No records found"})
            else:
                return jsonify({"status": 200, "data": data, "message": "Records found"})
        else:
            return jsonify({"status": 200, "data": {}, "message": data})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/getAfiiliationByHospital', methods=['GET', 'OPTIONS'])
def app_getAfiiliationByHospital():
    """
    Gets information for all the doctors affiliated to a hospital.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.

    Parameters
    ----------
    id : int
        ID hospital id.

    Returns
    ----------
    json
        Returns a json containing the status, data which contains the information, message in accordance with the status.
    """

    if request.method == 'GET':

        id = request.args.get('id')
        status, data = getAfiiliationByHospital(id)
        if status:
            if data == []:
                return jsonify({"status": 200, "data": {}, "message": "No records found"})
            else:
                return jsonify({"status": 200, "data": data, "message": "Records found"})
        else:
            return jsonify({"status": 200, "data": {}, "message": data})

    return jsonify({"status": 200, "data": {}, "message": ""})

# getDoctorSearch


@app.route('/getDoctorSearch', methods=['GET', 'OPTIONS'])
def app_getDoctorSearch():
    """
    Gives back all doctors that match keyword as firstname, lastname, primaryspecialty or secondaryspecialty.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.

    Parameters
    ----------
    id : int
        Keyword to search doctor.

    Returns
    ----------
    json
        Returns a json containing the status, data which contains the information, message in accordance with the status.
    """

    if request.method == 'GET':

        keyword = request.args.get('keyword')
        status, data = getDoctorSearch(keyword)
        if status:
            if data == []:
                return jsonify({"status": 200, "data": {}, "message": "No records found"})
            else:
                return jsonify({"status": 200, "data": data, "message": "Records found"})
        else:
            return jsonify({"status": 200, "data": {}, "message": data})

    return jsonify({"status": 200, "data": {}, "message": ""})

# getHospitalSearch


@app.route('/getHospitalSearch', methods=['GET', 'OPTIONS'])
def app_getHospitalSearch():
    """
    Gives back all hospitals that match keyword as name or address.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.

    Parameters
    ----------
    id : int
        Keyword to search hospital.

    Returns
    ----------
    json
        Returns a json containing the status, data which contains the information, message in accordance with the status.
    """

    if request.method == 'GET':

        keyword = request.args.get('keyword')
        status, data = getHospitalSearch(keyword)
        if status:
            if data == []:
                return jsonify({"status": 200, "data": {}, "message": "No records found"})
            else:
                return jsonify({"status": 200, "data": data, "message": "Records found"})
        else:
            return jsonify({"status": 200, "data": {}, "message": data})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/approvehospital', methods=['PUT', 'OPTIONS', 'GET'])
def approveHospitals():
    """
    Admin approving a hospital.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Information about hospital that is getting approved, if it is a put request.
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'PUT':
        data = json.loads(request.data)
        if (data["status"] == "Approved"):
            status, msg = updateHospitalStatus(data)

            if status:
                return jsonify({"status": 200, "data": {}, "message": msg})
            else:
                return jsonify({"status": 400, "data": {}, "message": msg})
        elif (data["status"] == "Denied"):
            status, msg = denyHospital(data)
            if status:
                return jsonify({"status": 200, "data": {}, "message": msg})
            else:
                return jsonify({"status": 400, "data": {}, "message": msg})

    elif request.method == 'GET':
        status, unapprovedHospital = getUnapprovedHospitals()
        if status:
            return jsonify({"status": 200, "data": unapprovedHospital, "message": "Unapproved Hospitals"})

        else:
            return jsonify({"status": 400, "data": {}, "message": unapprovedHospital})
    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/approvedoctors', methods=['PUT', 'OPTIONS', 'GET'])
def approveDoctors():
    """
    Admin approving a doctor.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Information about doctor who is getting approved, if it is a put request.
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """
    if request.method == 'PUT':
        data = json.loads(request.data)
        if (data["status"] == "Approved"):
            status, msg = updateDoctorStatus(data)
            if status:
                return jsonify({"status": 200, "data": {}, "message": msg})
            else:
                return jsonify({"status": 400, "data": {}, "message": msg})
        elif (data["status"] == "Denied"):
            status, msg = denyDoctor(data)
            if status:
                status, msg = removeUser(int(data["id"]))
                if status:
                    return jsonify({"status": 200, "data": {}, "message": msg})
                else:
                    return jsonify({"status": 400, "data": {}, "message": msg})
            else:
                return jsonify({"status": 400, "data": {}, "message": msg})

    elif request.method == 'GET':
        status, unapprovedDoctors = getUnapprovedDoctors()
        if status:
            return jsonify({"status": 200, "data": unapprovedDoctors, "message": "Unnapproved Doctors"})

        else:
            return jsonify({"status": 400, "data": {}, "message": unapprovedDoctors})
    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/register', methods=['POST', 'GET', 'OPTIONS'])
def register():
    """
    Register a user.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Information about user who is registering.
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'POST':
        data = json.loads(request.data)
        email = data['email']
        usertype = data['userType']

        if usertype == 'patient':
            check, status = checkDuplicateEmail(email)

            if (status == 0):
                return jsonify({"status": 400, "data": {}, "message": "Error while Accessing the database"})
            if (check):
                return jsonify({"status": 405, "data": {}, "message": "Please fill out the form again! The Email is taken/or is written in the wrong format"})

            check = addUser(data)
            if (check):
                return jsonify({"status": 200, "data": {}, "message": "You have registered succesfully"})
            else:
                return jsonify({"status": 400, "data": {}, "message": "Error while adding an user"})

        elif usertype == 'hospital':
            status, msg = addHospital(
                data['name'], data['address'], data['phoneNumber'], data['email'])

            if status == False:
                return jsonify({"status": 400, "data": {}, "message": msg})
            else:
                return jsonify({"status": 200, "data": {}, "message": "You have registered succesfully as Hospital"})

        elif usertype == 'doctor':
            check, status = checkDuplicateEmail(email)

            if (status == 0):
                return jsonify({"status": 400, "data": {}, "message": "Error while Accessing the database"})
            if (check):
                return jsonify({"status": 405, "data": {}, "message": "Please fill out the form again! The Email is taken/or is written in the wrong format"})

            check = addUser(data)

            if (check):

                userid = getUserProfileByEmail(email)
                if userid == []:
                    return jsonify({"status": 400, "data": {}, "message": "Error while Accessing the database"})
                else:
                    userid = userid["userid"]

                    status, msg = addDoctor(
                        data["name"], data["specialization"], data["phoneNumber"], data["email"], data["experience"], userid)

                    if status == False:
                        return jsonify({"status": 400, "data": {}, "message": msg})

                return jsonify({"status": 200, "data": {}, "message": "You have registered succesfully as a Doctor:)"})
            else:
                return jsonify({"status": 400, "data": {}, "message": "Error while adding an user"})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/login', methods=['POST', 'GET', 'OPTIONS'])
def login():
    """
    User login.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Information about user who is logging in.
    Returns
    ----------
    json
        Returns a json containing the status, data which contains logged in user's information, message in accordance with the status.
    """

    if request.method == 'POST':

        data = json.loads(request.data)
        email = data['email']
        password = data['password']

        userInfo, status = loginCheck(email, password)
        if (status == 0):
            return jsonify({"status": 400, "data": {}, "message": "Database Error"})

        if (len(userInfo) > 0):
            newDict = {}
            newDict["doctor"] = {}

            userid = userInfo["userid"]
            newDict["user"] = userInfo

            if userInfo["usertype"] == "doctor":
                status, data = getDoctorDetailsByUserID(userid)

                if status == True:
                    newDict["doctor"] = data[0]

                else:
                    return jsonify({"status": 400, "data": {}, "message": "Error while Accessing the database"})

            return jsonify({"status": 200, "data": newDict, "message": "Logged in Succesfully"})

        else:
            return jsonify({"status": 405, "data": {}, "message": "Incorrect email/Password"})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/profile', methods=['GET', 'OPTIONS'])
def getProfile():
    """
    Gets the profile of the current user.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    id : int
        ID of the user who is logged in.
    Returns
    ----------
    json
        Returns a json containing the status, data which contains user's information, message in accordance with the status.
    """

    if request.method == "GET":
        id = request.args.get('id')
        print(id)
        if (id):
            userInfo = getUserProfileByID(id)
            if (len(userInfo) == 0):
                return jsonify({"status": 400, "data": {}, "message": "Database Error"})
            else:
                return jsonify({"status": 200, "data": userInfo, "message": "Profile gotten succesfully"})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/updateprofile', methods=['PUT', 'OPTIONS', 'GET'])
def updateprofile():
    """
    Updates the profile of the current user.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Updated data of the user.
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """

    if request.method == 'PUT':
        data = json.loads(request.data)

        status, msg = updateUserProfile(data)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})

    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/appointmentInfoUser', methods=['PUT', 'OPTIONS', 'GET'])
def getAppointmentInfoUser():
    """
    Gets Appointment for User.\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Updated data of the user.
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """
    if (request.method == "GET"):
        id = request.args.get('id')
        if (id):
            status, appointmentInfos = getAppointmentInfoUserDB(id)

            if (status == False):
                return jsonify({"status": 400, "data": {}, "message": appointmentInfos})
            else:
                return jsonify({"status": 200, "data": appointmentInfos, "message": "Retrieved Appointments"})
    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/appointmentInfoDoctor', methods=['PUT', 'OPTIONS', 'GET'])
def getAppointmentInfoDoctor():
    """
    Gets Appointment Info for doctor\n
    Response is a json which contains:\n
    1) Status - This can take 3 values = (200 : Perfect response, 405 : Database Error, 400 : Failure from client side ).\n
    2) Data - Associated data with the operation.\n
    3) Message - A message assoicated with the status.
    Parameters
    ----------
    data : json
        Updated data of the user.
    Returns
    ----------
    json
        Returns a json containing the status, data(No data associated with this function, hence the data is empty), message in accordance with the status.
    """
    if (request.method == "GET"):
        id = request.args.get('id')
        if (id):
            status, appointmentInfos = getAppointmentInfoDoctorDB(id)

            if (status == False):
                return jsonify({"status": 400, "data": {}, "message": appointmentInfos})
            else:
                return jsonify({"status": 200, "data": appointmentInfos, "message": "Retrieved Appointments"})
    return jsonify({"status": 200, "data": {}, "message": ""})


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5001)
