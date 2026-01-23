const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('pt-BR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
}

const formatStatusLabel = (status) => {
    switch (status) {
        case 'confirmed':
            return "Confirmado";
        case 'canceled':
            return 'Cancelado';
        case 'pending':
            return 'Pendente';
        case 'refused':
            return 'Recusado';
        default:
            return 'Alerta';
    }
}

const formatStatusClass = (status) => {
    switch (status) {
        case 'confirmed':
          return 'success';
        case 'canceled':
          return 'danger';
        case 'pending':
          return 'warning';
        case 'refused':
          return 'danger';
        default:
          return 'warning';
    }
}

const formatModality = (modality) => {
    switch (modality) {
        case 'mixed':
            return "Misto";
        case 'male':
            return 'Masculino';
        case 'female':
            return 'Feminino';
        default:
            return 'Indefinido';
    }
}

export {
    formatDate,
    formatStatusLabel,
    formatStatusClass,
    formatModality,
}