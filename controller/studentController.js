const studentDB = require('../models')
const Student = studentDB.models

exports.studentID = async (req, res) => {
  const { id } = req.params;
  const { name, surname, userNumber, password, email, mobilePhone, educationalLevel, entryYear, incomingSemester, GPA, faculty } = req.body;

  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the ID sent is related to the student himself
    if (student.user.userNumber !== userNumber) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Update the student's information
    student.user.name = name;
    student.user.surname = surname;
    student.user.password = password;
    student.user.email = email;
    student.user.mobilePhone = mobilePhone;
    student.educationalLevel = educationalLevel;
    student.entryYear = entryYear;
    student.incomingSemester = incomingSemester;
    student.GPA = GPA;
    student.faculty = faculty;

    await student.save();

    res.json(student);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}