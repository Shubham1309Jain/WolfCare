import unittest
from unittest.mock import patch
import json
from urllib import response

from src.backend.app import app


class TestApp(unittest.TestCase):
    def test_register_get(self):
        tester = app.test_client(self)
        response = tester.get("/register")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.checkDuplicateEmail')
    def test_register_post(self, mockCheckDuplicateEmail):
        tester = app.test_client(self)
        mockCheckDuplicateEmail.return_value = True,1
        inpData = { "name" : "Sam",
	 	"email" : "sam@gmail.com",
	 	"password" : "password",
	 	"repeatpassword":" value.rePass",
	 	"bloodGroup":" value.bloodGroup",
	 	"phoneNumber":" value.phoneNumber",
	 	"userType":"patient",
	 	"experience":" value.experience",
	 	"specialization":" value.specialization",
	 	"address":" value.address"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        
        expected = {"status": 405, "data": {
        }, "message": "Please fill out the form again! The Email is taken/or is written in the wrong format"} 

        assert expected == json.loads(response.get_data(as_text=True))
    
    @patch('src.backend.app.checkDuplicateEmail')
    def test_register_post_1(self, mockCheckDuplicateEmail):
        tester = app.test_client(self)
        mockCheckDuplicateEmail.return_value = True,0
        inpData = { "name" : "Sam",
	 	"email" : "sam@gmail.com",
	 	"password" : "password",
	 	"repeatpassword":" value.rePass",
	 	"bloodGroup":" value.bloodGroup",
	 	"phoneNumber":" value.phoneNumber",
	 	"userType":"patient",
	 	"experience":" value.experience",
	 	"specialization":" value.specialization",
	 	"address":" value.address"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        
        expected = {"status": 400, "data": {}, "message": "Error while Accessing the database"}

        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.addUser')
    @patch('src.backend.app.checkDuplicateEmail')
    def test_register_post_2(self, mockCheckDuplicateEmail, mockaddUser):
        tester = app.test_client(self)
        mockCheckDuplicateEmail.return_value = False,1
        mockaddUser.return_value = True
        inpData = { "name" : "Sam",
	 	"email" : "sam@gmail.com",
	 	"password" : "password",
	 	"repeatpassword":" value.rePass",
	 	"bloodGroup":" value.bloodGroup",
	 	"phoneNumber":" value.phoneNumber",
	 	"userType":"patient",
	 	"experience":" value.experience",
	 	"specialization":" value.specialization",
	 	"address":" value.address"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        
        expected = {"status": 200, "data": {}, "message": "You have registered succesfully"}

        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.addUser')
    @patch('src.backend.app.checkDuplicateEmail')
    def test_register_post_3(self, mockCheckDuplicateEmail, mockaddUser):
        tester = app.test_client(self)
        mockCheckDuplicateEmail.return_value = False,1
        mockaddUser.return_value = False
        inpData = { "name" : "Sam",
	 	"email" : "sam@gmail.com",
	 	"password" : "password",
	 	"repeatpassword":" value.rePass",
	 	"bloodGroup":" value.bloodGroup",
	 	"phoneNumber":" value.phoneNumber",
	 	"userType":"patient",
	 	"experience":" value.experience",
	 	"specialization":" value.specialization",
	 	"address":" value.address"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        
        expected = {"status": 400, "data": {}, "message": "Error while adding an user"}

        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.addHospital')
    def test_register_post_4(self, mockaddHospital):
        tester = app.test_client(self)
        mockaddHospital.return_value = False,"Hi"
        inpData = { "name" : "Sam",
	 	"email" : "sam@gmail.com",
	 	"password" : "password",
	 	"repeatpassword":" value.rePass",
	 	"bloodGroup":" value.bloodGroup",
	 	"phoneNumber":" value.phoneNumber",
	 	"userType":"hospital",
	 	"experience":" value.experience",
	 	"specialization":" value.specialization",
	 	"address":" value.address"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        
        expected = {"status": 400, "data": {}, "message": "Hi"}

        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.addHospital')
    def test_register_post_5(self, mockaddHospital):
        tester = app.test_client(self)
        mockaddHospital.return_value = True,"Hi"
        inpData = { "name" : "Sam",
	 	"email" : "sam@gmail.com",
	 	"password" : "password",
	 	"repeatpassword":" value.rePass",
	 	"bloodGroup":" value.bloodGroup",
	 	"phoneNumber":" value.phoneNumber",
	 	"userType":"hospital",
	 	"experience":" value.experience",
	 	"specialization":" value.specialization",
	 	"address":" value.address"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        
        expected = {"status": 200, "data": {}, "message": "You have registered succesfully as Hospital"}

        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getUserProfileByEmail')
    @patch('src.backend.app.addUser')
    @patch('src.backend.app.checkDuplicateEmail')
    def test_register_post_6(self, mockCheckDuplicateEmail, mockaddUser, mockgetUserProfileByEmail):
        tester = app.test_client(self)
        mockCheckDuplicateEmail.return_value = False,1
        mockaddUser.return_value = True
        mockgetUserProfileByEmail.return_value = []
        inpData = { "name" : "Sam",
	 	"email" : "sam@gmail.com",
	 	"password" : "password",
	 	"repeatpassword":" value.rePass",
	 	"bloodGroup":" value.bloodGroup",
	 	"phoneNumber":" value.phoneNumber",
	 	"userType":"doctor",
	 	"experience":" value.experience",
	 	"specialization":" value.specialization",
	 	"address":" value.address"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        
        expected = {"status": 400, "data": {}, "message": "Error while Accessing the database"}

        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.addDoctor')
    @patch('src.backend.app.getUserProfileByEmail')
    @patch('src.backend.app.addUser')
    @patch('src.backend.app.checkDuplicateEmail')
    def test_register_post_7(self, mockCheckDuplicateEmail, mockaddUser, mockgetUserProfileByEmail, mockaddDoctor):
        tester = app.test_client(self)
        mockCheckDuplicateEmail.return_value = False,1
        mockaddUser.return_value = True
        mockgetUserProfileByEmail.return_value = {"userid": 1}
        mockaddDoctor.return_value = False, "Hi"
        inpData = { "name" : "Sam",
	 	"email" : "sam@gmail.com",
	 	"password" : "password",
	 	"repeatpassword":" value.rePass",
	 	"bloodGroup":" value.bloodGroup",
	 	"phoneNumber":" value.phoneNumber",
	 	"userType":"doctor",
	 	"experience":" value.experience",
	 	"specialization":" value.specialization",
	 	"address":" value.address"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        
        expected = {"status": 400, "data": {}, "message": "Hi"}

        assert expected == json.loads(response.get_data(as_text=True))


    @patch('src.backend.app.addDoctor')
    @patch('src.backend.app.getUserProfileByEmail')
    @patch('src.backend.app.addUser')
    @patch('src.backend.app.checkDuplicateEmail')
    def test_register_post_8(self, mockCheckDuplicateEmail, mockaddUser, mockgetUserProfileByEmail, mockaddDoctor):
        tester = app.test_client(self)
        mockCheckDuplicateEmail.return_value = False,1
        mockaddUser.return_value = True
        mockgetUserProfileByEmail.return_value = {"userid": 1}
        mockaddDoctor.return_value = True, "Hi"
        inpData = { "name" : "Sam",
	 	"email" : "sam@gmail.com",
	 	"password" : "password",
	 	"repeatpassword":" value.rePass",
	 	"bloodGroup":" value.bloodGroup",
	 	"phoneNumber":" value.phoneNumber",
	 	"userType":"doctor",
	 	"experience":" value.experience",
	 	"specialization":" value.specialization",
	 	"address":" value.address"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        
        expected = {"status": 200, "data": {}, "message": "You have registered succesfully as a Doctor:)"}

        assert expected == json.loads(response.get_data(as_text=True))

    def test_login_other(self):
        tester = app.test_client(self)
        response = tester.get("/login")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))
    
    @patch('src.backend.app.loginCheck')
    def test_login_post(self, mockloginCheck):
        tester = app.test_client(self)
        mockloginCheck.return_value = [], 0
        inpData = {
	 	"email" : "sam@gmail.com",
	 	"password" : "password"}
        response = tester.post("/login", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        expected = {"status": 400, "data": {}, "message": "Database Error"}

        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.loginCheck')
    def test_login_post_1(self, mockloginCheck):
        tester = app.test_client(self)
        mockloginCheck.return_value = {"userid":7002,"usertype":"patient"}, 1
        inpData = {
	 	"email" : "sam@gmail.com",
	 	"password" : "password"}
        response = tester.post("/login", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {"user":{"userid":7002,"usertype":"patient"},"doctor":{}}, "message": "Logged in Succesfully"}

        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getDoctorDetailsByUserID')
    @patch('src.backend.app.loginCheck')
    def test_login_post_2(self, mockloginCheck, mockgetDoctorDetailsByUserID):
        tester = app.test_client(self)
        mockloginCheck.return_value = {"userid":7002,"usertype":"doctor"}, 1
        mockgetDoctorDetailsByUserID.return_value = 0, [{}]
        inpData = {
	 	"email" : "sam@gmail.com",
	 	"password" : "password"}
        response = tester.post("/login", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 400, "data": {}, "message": "Error while Accessing the database"}

        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getDoctorDetailsByUserID')
    @patch('src.backend.app.loginCheck')
    def test_login_post_3(self, mockloginCheck, mockgetDoctorDetailsByUserID):
        tester = app.test_client(self)
        mockloginCheck.return_value = {"userid":7002,"usertype":"doctor"}, 1
        mockgetDoctorDetailsByUserID.return_value = 1, [{"doctorid" : 123, "lastname" : "Shyam"}]
        inpData = {
	 	"email" : "sam@gmail.com",
	 	"password" : "password"}
        response = tester.post("/login", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {"user":{"userid":7002,"usertype":"doctor"},"doctor":{"doctorid" : 123, "lastname" : "Shyam"}}, "message": "Logged in Succesfully"}

        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.loginCheck')
    def test_login_post_4(self, mockloginCheck):
        tester = app.test_client(self)
        mockloginCheck.return_value = {}, 1
        inpData = {
	 	"email" : "sam@gmail.com",
	 	"password" : "password"}
        response = tester.post("/login", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 405, "data": {}, "message": "Incorrect email/Password"}
        assert expected == json.loads(response.get_data(as_text=True))
    

    def test_profile_get(self):
        tester = app.test_client(self)
        response = tester.get("/profile")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))
    
    @patch('src.backend.app.getUserProfileByID')
    def test_profile_get_1(self, mockgetUserProfileByID):
        tester = app.test_client(self)
        mockgetUserProfileByID.return_value = {}
        response = tester.get("/profile?id=2")
        expected = {"status": 400, "data": {}, "message": "Database Error"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getUserProfileByID')
    def test_profile_get_2(self, mockgetUserProfileByID):
        tester = app.test_client(self)
        mockgetUserProfileByID.return_value = {"userid":2, "usertype":"Doctor"}
        response = tester.get("/profile?id=2")
        expected = {"status": 200, "data": {"userid":2, "usertype":"Doctor"}, "message": "Profile gotten succesfully"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.updateUserProfile')
    def test_update_profile(self, mockupdateUserProfile):
        tester = app.test_client(self)
        mockupdateUserProfile.return_value = 1, "Hi"
        inpData = {
	 	"email" : "sam@gmail.com",
	 	"password" : "password"}
        response = tester.put("/updateprofile", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.updateUserProfile')
    def test_update_profile_1(self, mockupdateUserProfile):
        tester = app.test_client(self)
        mockupdateUserProfile.return_value = 0, "Hi"
        inpData = {
	 	"email" : "sam@gmail.com",
	 	"password" : "password"}
        response = tester.put("/updateprofile", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))
    
    def test_app_info_user(self):
        tester = app.test_client(self)
        response = tester.get("/appointmentInfoUser")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))
    
    @patch('src.backend.app.getAppointmentInfoUserDB')
    def test_app_info_user_1(self, mockgetAppointmentInfoUserDB):
        tester = app.test_client(self)
        mockgetAppointmentInfoUserDB.return_value = 0, "Hi"
        response = tester.get("/appointmentInfoUser?id=2")
        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getAppointmentInfoUserDB')
    def test_app_info_user_2(self, mockgetAppointmentInfoUserDB):
        tester = app.test_client(self)
        mockgetAppointmentInfoUserDB.return_value = 1, {"appointmentid": 2, "timeslot" : "2-3"}
        response = tester.get("/appointmentInfoUser?id=2")
        expected = {"status": 200, "data": {"appointmentid": 2, "timeslot" : "2-3"}, "message": "Retrieved Appointments"}
        assert expected == json.loads(response.get_data(as_text=True))

    def test_app_info_doctor(self):
        tester = app.test_client(self)
        response = tester.get("/appointmentInfoDoctor")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))
    
    @patch('src.backend.app.getAppointmentInfoDoctorDB')
    def test_app_info_doctor_1(self, mockgetAppointmentInfoDoctorDB):
        tester = app.test_client(self)
        mockgetAppointmentInfoDoctorDB.return_value = 0, "Hi"
        response = tester.get("/appointmentInfoDoctor?id=2")
        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getAppointmentInfoDoctorDB')
    def test_app_info_doctor_2(self, mockgetAppointmentInfoDoctorDB):
        tester = app.test_client(self)
        mockgetAppointmentInfoDoctorDB.return_value = 1, {"appointmentid": 2, "timeslot" : "2-3"}
        response = tester.get("/appointmentInfoDoctor?id=2")
        expected = {"status": 200, "data": {"appointmentid": 2, "timeslot" : "2-3"}, "message": "Retrieved Appointments"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getUnapprovedHospitals')
    def test_approveHospitals(self, mockgetUnapprovedHospitals):
        tester = app.test_client(self)
        mockgetUnapprovedHospitals.return_value = 0, "Hi"
        response = tester.get("/approvehospital")
        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getUnapprovedHospitals')
    def test_approveHospitals_1(self, mockgetUnapprovedHospitals):
        tester = app.test_client(self)
        mockgetUnapprovedHospitals.return_value = 1, {"hospitalid" : 2003, "name" : "Aboot National"}
        response = tester.get("/approvehospital")
        expected = {"status": 200, "data": {"hospitalid" : 2003, "name" : "Aboot National"}, "message": "Unapproved Hospitals"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getUnapprovedDoctors')
    def test_approveDoctors(self, getUnapprovedDoctors):
        tester = app.test_client(self)
        getUnapprovedDoctors.return_value = 0, "Hi"
        response = tester.get("/approvedoctors")
        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getUnapprovedDoctors')
    def test_approveDoctors_1(self, getUnapprovedDoctors):
        tester = app.test_client(self)
        getUnapprovedDoctors.return_value = 1, {"doctorid" : 2003, "name" : "Aboot National"}
        response = tester.get("/approvedoctors")
        expected = {"status": 200, "data": {"doctorid" : 2003, "name" : "Aboot National"}, "message": "Unnapproved Doctors"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.updateHospitalStatus')
    def test_approveHospitals_put(self, mockupdateHospitalStatus):
        tester = app.test_client(self)
        mockupdateHospitalStatus.return_value = 1, "Hi"
        inpData = {"status": "Approved"}
        response = tester.put("/approvehospital", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.updateHospitalStatus')
    def test_approveHospitals_put_1(self, mockupdateHospitalStatus):
        tester = app.test_client(self)
        mockupdateHospitalStatus.return_value = 0, "Hi"
        inpData = {"status": "Approved"}
        response = tester.put("/approvehospital", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.denyHospital')
    def test_approveHospitals_put_2(self, mockdenyHospital):
        tester = app.test_client(self)
        mockdenyHospital.return_value = 1, "Hi"
        inpData = {"status": "Denied"}
        response = tester.put("/approvehospital", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.denyHospital')
    def test_approveHospitals_put_3(self, mockdenyHospital):
        tester = app.test_client(self)
        mockdenyHospital.return_value = 0, "Hi"
        inpData = {"status": "Denied"}
        response = tester.put("/approvehospital", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.updateDoctorStatus')
    def test_approveDoctors_put(self, mockupdateDoctorStatus):
        tester = app.test_client(self)
        mockupdateDoctorStatus.return_value = 1, "Hi"
        inpData = {"status": "Approved"}
        response = tester.put("/approvedoctors", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.updateDoctorStatus')
    def test_approveDoctors_put_1(self, mockupdateDoctorStatus):
        tester = app.test_client(self)
        mockupdateDoctorStatus.return_value = 0, "Hi"
        inpData = {"status": "Approved"}
        response = tester.put("/approvedoctors", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.removeUser')
    @patch('src.backend.app.denyDoctor')
    def test_approvedoctors_put_2(self, mockdenyDoctor, mockremoveUser):
        tester = app.test_client(self)
        mockdenyDoctor.return_value = 1, "Hi"
        mockremoveUser.return_value = 0, "Hi"
        inpData = {"status": "Denied", "id" : 7002}
        response = tester.put("/approvedoctors", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.removeUser')
    @patch('src.backend.app.denyDoctor')
    def test_approvedoctors_put_4(self, mockdenyDoctor, mockremoveUser):
        tester = app.test_client(self)
        mockdenyDoctor.return_value = 1, "Hi"
        mockremoveUser.return_value = 1, "Hi"
        inpData = {"status": "Denied", "id" : 7002}
        response = tester.put("/approvedoctors", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.denyDoctor')
    def test_approvedoctors_put_3(self, mockdenyDoctor):
        tester = app.test_client(self)
        mockdenyDoctor.return_value = 0, "Hi"
        inpData = {"status": "Denied"}
        response = tester.put("/approvedoctors", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))
    
    def test_empty(self):
        tester = app.test_client(self)
        response = tester.get("/")
        expected = {'data': {}, 'message': "Backend working", 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))
    
    @patch('src.backend.app.updateDoctorInfo')
    def test_update_doctor_post(self, mockupdateDoctorInfo):
        tester = app.test_client(self)
        mockupdateDoctorInfo.return_value = 0, "Hi"
        inpData = {"lastname": "Arun"}
        response = tester.put("/updateDoctor", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.updateDoctorInfo')
    def test_update_doctor_post_1(self, mockupdateDoctorInfo):
        tester = app.test_client(self)
        mockupdateDoctorInfo.return_value = 1, "Hi"
        inpData = {"lastname": "Arun"}
        response = tester.put("/updateDoctor", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getDoctorDetails')
    def test_get_doctor_info(self, mockgetDoctorDetails):
        tester = app.test_client(self)
        mockgetDoctorDetails.return_value = 0, "Hi"
        response = tester.get("/getDoctorInfo?id=2")
        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getDoctorDetails')
    def test_get_doctor_info_1(self, mockgetDoctorDetails):
        tester = app.test_client(self)
        mockgetDoctorDetails.return_value = 1, []
        response = tester.get("/getDoctorInfo?id=2")
        expected = {"status": 200, "data": {}, "message": "No records found"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getDoctorDetails')
    def test_get_doctor_info_2(self, mockgetDoctorDetails):
        tester = app.test_client(self)
        mockgetDoctorDetails.return_value = 1, [{"doctorid": 2003}]
        response = tester.get("/getDoctorInfo?id=2")
        expected = {"status": 200, "data": [{"doctorid": 2003}], "message": "Records found"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getDoctors')
    def test_get_doctor(self, mockgetDoctors):
        tester = app.test_client(self)
        mockgetDoctors.return_value = 0, "Hi"
        response = tester.get("/getDoctors")
        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getDoctors')
    def test_get_doctor_1(self, mockgetDoctors):
        tester = app.test_client(self)
        mockgetDoctors.return_value = 1, []
        response = tester.get("/getDoctors")
        expected = {"status": 200, "data": {}, "message": "No records found"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getDoctors')
    def test_get_doctor_2(self, mockgetDoctors):
        tester = app.test_client(self)
        mockgetDoctors.return_value = 1, [{"doctorid": 2003}]
        response = tester.get("/getDoctors")
        expected = {"status": 200, "data": [{"doctorid": 2003}], "message": "Records found"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getHospitals')
    def test_get_hospital(self, mockgetHospitals):
        tester = app.test_client(self)
        mockgetHospitals.return_value = 0, "Hi"
        response = tester.get("/getHospitals")
        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getHospitals')
    def test_get_hospital_1(self, mockgetHospitals):
        tester = app.test_client(self)
        mockgetHospitals.return_value = 1, []
        response = tester.get("/getHospitals")
        expected = {"status": 200, "data": {}, "message": "No records found"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getHospitals')
    def test_get_hospital_2(self, mockgetHospitals):
        tester = app.test_client(self)
        mockgetHospitals.return_value = 1, [{"doctorid": 2003}]
        response = tester.get("/getHospitals")
        expected = {"status": 200, "data": [{"doctorid": 2003}], "message": "Records found"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getHospitalDetails')
    def test_get_hospital_info(self, mockgetHospitalDetails):
        tester = app.test_client(self)
        mockgetHospitalDetails.return_value = 0, "Hi"
        response = tester.get("/getHospitalInfo?id=2")
        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getHospitalDetails')
    def test_get_hospital_info_1(self, mockgetHospitalDetails):
        tester = app.test_client(self)
        mockgetHospitalDetails.return_value = 1, []
        response = tester.get("/getHospitalInfo?id=2")
        expected = {"status": 200, "data": {}, "message": "No records found"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.getHospitalDetails')
    def test_get_hospital_info_2(self, mockgetHospitalDetails):
        tester = app.test_client(self)
        mockgetHospitalDetails.return_value = 1, [{"doctorid": 2003}]
        response = tester.get("/getHospitalInfo?id=2")
        expected = {"status": 200, "data": [{"doctorid": 2003}], "message": "Records found"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.addAppointment')
    def test_add_appointment_post(self, mockaddAppointment):
        tester = app.test_client(self)
        mockaddAppointment.return_value = 1, "Hi"
        inpData = {"userid": 1002,"hospitalid": 2004,"doctorid" : 3004, "date" : "2022", "timeslot" : "2-3"}
        response = tester.post("/addAppointment", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.addAppointment')
    def test_add_appointment_post_1(self, mockaddAppointment):
        tester = app.test_client(self)
        mockaddAppointment.return_value = 0, "Hi"
        inpData = {"userid": 1002,"hospitalid": 2004,"doctorid" : 3004, "date" : "2022", "timeslot" : "2-3"}
        response = tester.post("/addAppointment", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.updateAppointmentInfo')
    def test_update_appointment_post_1(self, mockupdateAppointmentInfo):
        tester = app.test_client(self)
        mockupdateAppointmentInfo.return_value = 0, "Hi"
        inpData = {"userid": 1002,"hospitalid": 2004,"doctorid" : 3004, "date" : "2022", "timeslot" : "2-3"}
        response = tester.put("/updateAppointment", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 400, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.backend.app.updateAppointmentInfo')
    def test_update_appointment_post_2(self, mockupdateAppointmentInfo):
        tester = app.test_client(self)
        mockupdateAppointmentInfo.return_value = 1, "Hi"
        inpData = {"userid": 1002,"hospitalid": 2004,"doctorid" : 3004, "date" : "2022", "timeslot" : "2-3"}
        response = tester.put("/updateAppointment", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {}, "message": "Hi"}
        assert expected == json.loads(response.get_data(as_text=True))