exports.validateAppointment = (data) => {
const { customerId, serviceName, appointmentDate } = data;


if (!customerId) return { error: 'customerId is required' };
if (!serviceName) return { error: 'serviceName is required' };


const date = new Date(appointmentDate);
if (!appointmentDate || isNaN(date.getTime())) {
return { error: 'appointmentDate must be a valid date' };
}


return { error: null };
};